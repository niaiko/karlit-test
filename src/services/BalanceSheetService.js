const { BalanceSheetRepository } = require('../repositories/BalanceSheetRepository');
const { ClientRepository } = require('../repositories/ClientRepository');
const { NotFoundError, BadRequestError } = require('../utils/errors');

class BalanceSheetService {
  constructor() {
    this.balanceSheetRepository = new BalanceSheetRepository();
    this.clientRepository = new ClientRepository();
  }

  async getBalanceSheetsByClientId(clientId) {
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      throw new NotFoundError(`Client with id ${clientId} not found`);
    }

    const balanceSheets = await this.balanceSheetRepository.findByClientId(clientId);
    return balanceSheets.map((bs) => ({
      clientId: bs.clientId,
      year: bs.year,
      result: bs.result,
    }));
  }

  async createBalanceSheet(balanceSheetData) {
    const client = await this.clientRepository.findById(balanceSheetData.clientId);
    if (!client) {
      throw new NotFoundError(`Client with id ${balanceSheetData.clientId} not found`);
    }

    const existingBalanceSheet = await this.balanceSheetRepository.findByClientIdAndYear(
      balanceSheetData.clientId,
      balanceSheetData.year,
    );

    if (existingBalanceSheet) {
      throw new BadRequestError(
        `Balance sheet for client ${balanceSheetData.clientId} and year ${balanceSheetData.year} already exists`,
      );
    }

    const balanceSheet = await this.balanceSheetRepository.create(balanceSheetData);
    return {
      clientId: balanceSheet.clientId,
      year: balanceSheet.year,
      result: balanceSheet.result,
    };
  }

  async updateBalanceSheet(clientId, year, balanceSheetData) {
    const existingBalanceSheet = await this.balanceSheetRepository.findByClientIdAndYear(clientId, year);
    if (!existingBalanceSheet) {
      throw new NotFoundError(`Balance sheet for client ${clientId} and year ${year} not found`);
    }

    const balanceSheet = await this.balanceSheetRepository.update(clientId, year, balanceSheetData);
    return {
      clientId: balanceSheet.clientId,
      year: balanceSheet.year,
      result: balanceSheet.result,
    };
  }

  async deleteBalanceSheet(clientId, year) {
    const deleted = await this.balanceSheetRepository.delete(clientId, year);
    if (!deleted) {
      throw new NotFoundError(`Balance sheet for client ${clientId} and year ${year} not found`);
    }
  }
}

module.exports = { BalanceSheetService };

