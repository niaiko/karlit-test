const { BalanceSheetRepository } = require('../repositories/BalanceSheetRepository');
const { ClientRepository } = require('../repositories/ClientRepository');
const { NotFoundError, BadRequestError } = require('../utils/errors');

class BalanceSheetService {
  constructor() {
    this.balanceSheetRepository = new BalanceSheetRepository();
    this.clientRepository = new ClientRepository();
  }

  async getBalanceSheetsByClientId(clientId) {
    try {
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
    } catch (error) {
      // Propager l'erreur NotFoundError, mais convertir les autres erreurs en erreurs génériques
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error('Error in getBalanceSheetsByClientId:', error);
      throw new Error(`Failed to get balance sheets for client ${clientId}: ${error.message}`);
    }
  }

  async createBalanceSheet(balanceSheetData) {
    try {
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
    } catch (error) {
      // Propager les erreurs NotFoundError et BadRequestError, mais convertir les autres erreurs en erreurs génériques
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      console.error('Error in createBalanceSheet:', error);
      throw new Error(`Failed to create balance sheet: ${error.message}`);
    }
  }

  async updateBalanceSheet(clientId, year, balanceSheetData) {
    try {
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
    } catch (error) {
      // Propager l'erreur NotFoundError, mais convertir les autres erreurs en erreurs génériques
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error('Error in updateBalanceSheet:', error);
      throw new Error(`Failed to update balance sheet: ${error.message}`);
    }
  }

  async deleteBalanceSheet(clientId, year) {
    try {
      const existingBalanceSheet = await this.balanceSheetRepository.findByClientIdAndYear(clientId, year);
      if (!existingBalanceSheet) {
        throw new NotFoundError(`Balance sheet for client ${clientId} and year ${year} not found`);
      }

      const deleted = await this.balanceSheetRepository.delete(clientId, year);
      if (!deleted) {
        throw new NotFoundError(`Balance sheet for client ${clientId} and year ${year} not found`);
      }
    } catch (error) {
      // Propager l'erreur NotFoundError, mais convertir les autres erreurs en erreurs génériques
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error('Error in deleteBalanceSheet:', error);
      throw new Error(`Failed to delete balance sheet: ${error.message}`);
    }
  }
}

module.exports = { BalanceSheetService };

