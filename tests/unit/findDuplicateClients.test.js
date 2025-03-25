const { ClientRepository } = require('../../src/repositories/ClientRepository');
const { BalanceSheetRepository } = require('../../src/repositories/BalanceSheetRepository');
const { findDuplicateClients } = require('../../src/scripts/findDuplicateClients');

// Mock les modèles et repositories avant d'importer les modules qui les utilisent
jest.mock('../../src/models/Client', () => {
  return {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };
});

jest.mock('../../src/models/BalanceSheet', () => {
  return {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };
});

// Mock les repositories
jest.mock('../../src/repositories/ClientRepository');
jest.mock('../../src/repositories/BalanceSheetRepository');

// Mock la configuration de la base de données
jest.mock('../../src/config/database', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(true),
    define: jest.fn().mockReturnValue({}),
  },
}));

describe('findDuplicateClients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array when no potential duplicates found', async () => {
    // Mock implementation
    ClientRepository.prototype.findDuplicates = jest.fn().mockResolvedValue([]);

    const result = await findDuplicateClients();

    expect(result).toEqual([]);
    expect(ClientRepository.prototype.findDuplicates).toHaveBeenCalledTimes(1);
    expect(BalanceSheetRepository.prototype.compareBalanceSheets).not.toHaveBeenCalled();
  });

  it('should return confirmed duplicates when found', async () => {
    // Mock potential duplicates
    const potentialDuplicates = [
      [1, 2],
      [3, 4, 5],
    ];
    ClientRepository.prototype.findDuplicates = jest.fn().mockResolvedValue(potentialDuplicates);

    // Mock confirmed duplicates
    const confirmedDuplicates = [[1, 2]]; // Only the first group is confirmed
    BalanceSheetRepository.prototype.compareBalanceSheets = jest.fn().mockResolvedValue(confirmedDuplicates);

    const result = await findDuplicateClients();

    expect(result).toEqual(confirmedDuplicates);
    expect(ClientRepository.prototype.findDuplicates).toHaveBeenCalledTimes(1);
    expect(BalanceSheetRepository.prototype.compareBalanceSheets).toHaveBeenCalledWith(potentialDuplicates);
  });

  it('should throw error if database operations fail', async () => {
    // Mock error
    const error = new Error('Database error');
    const sequelize = require('../../src/config/database').sequelize;
    sequelize.authenticate = jest.fn().mockRejectedValue(error);

    await expect(findDuplicateClients()).rejects.toThrow('Database error');
  });
});

