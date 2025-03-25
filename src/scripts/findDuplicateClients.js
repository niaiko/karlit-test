const { sequelize } = require('../config/database');
const { ClientRepository } = require('../repositories/ClientRepository');
const { BalanceSheetRepository } = require('../repositories/BalanceSheetRepository');
const logger = require('../utils/logger');

/**
 * Script to find duplicate clients based on the following criteria:
 * - Same first name and last name
 * - If they have balance sheets for the same year, the results must be identical
 *
 * @returns {Promise<Array<Array<number>>>} Array of arrays containing IDs of duplicate clients
 */
async function findDuplicateClients() {
  try {
    // Vérifier la connexion à la base de données
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    const clientRepository = new ClientRepository();
    const balanceSheetRepository = new BalanceSheetRepository();

    // Étape 1: Trouver les doublons potentiels (clients avec le même nom)
    logger.info('Finding potential duplicate clients...');
    const potentialDuplicates = await clientRepository.findDuplicates();

    if (potentialDuplicates.length === 0) {
      logger.info('No potential duplicates found');
      return [];
    }

    logger.info(`Found ${potentialDuplicates.length} groups of potential duplicates`);

    // Étape 2: Pour chaque groupe de doublons potentiels, vérifier leurs bilans
    logger.info('Checking balance sheets for potential duplicates...');
    const confirmedDuplicates = await balanceSheetRepository.compareBalanceSheets(potentialDuplicates);

    logger.info(`Found ${confirmedDuplicates.length} groups of confirmed duplicates`);
    logger.info('Duplicate client IDs:', confirmedDuplicates);

    return confirmedDuplicates;
  } catch (error) {
    logger.error('Error finding duplicate clients:', error);
    throw error;
  }
}

// Si ce script est exécuté directement (pas importé)
if (require.main === module) {
  findDuplicateClients()
    .then(() => {
      logger.info('Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Script failed:', error);
      process.exit(1);
    });
}

module.exports = { findDuplicateClients };

