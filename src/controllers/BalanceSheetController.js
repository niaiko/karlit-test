const { BalanceSheetService } = require('../services/BalanceSheetService');
const {
  validateBalanceSheetCreate,
  validateBalanceSheetUpdate,
} = require('../middlewares/validators/balanceSheetValidator');
const { NotFoundError, BadRequestError } = require('../utils/errors');

class BalanceSheetController {
  constructor() {
    this.balanceSheetService = new BalanceSheetService();
  }

  getBalanceSheetsByClientId = async (req, res, next) => {
    try {
      const clientId = Number.parseInt(req.params.clientId);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: 'Invalid client ID' });
      }

      const balanceSheets = await this.balanceSheetService.getBalanceSheetsByClientId(clientId);
      res.status(200).json(balanceSheets);
    } catch (error) {
      // Gérer les erreurs spécifiques ici
      if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  };

  createBalanceSheet = async (req, res, next) => {
    try {
      const { error, value } = validateBalanceSheetCreate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const balanceSheet = await this.balanceSheetService.createBalanceSheet(value);
      res.status(201).json(balanceSheet);
    } catch (error) {
      // Gérer les erreurs spécifiques ici
      if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      if (error instanceof BadRequestError) {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  };

  updateBalanceSheet = async (req, res, next) => {
    try {
      const clientId = Number.parseInt(req.params.clientId);
      const year = Number.parseInt(req.params.year);

      if (isNaN(clientId) || isNaN(year)) {
        return res.status(400).json({ error: 'Invalid client ID or year' });
      }

      const { error, value } = validateBalanceSheetUpdate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const balanceSheet = await this.balanceSheetService.updateBalanceSheet(clientId, year, value);
      res.status(200).json(balanceSheet);
    } catch (error) {
      // Gérer les erreurs spécifiques ici
      if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  };

  deleteBalanceSheet = async (req, res, next) => {
    try {
      const clientId = Number.parseInt(req.params.clientId);
      const year = Number.parseInt(req.params.year);

      if (isNaN(clientId) || isNaN(year)) {
        return res.status(400).json({ error: 'Invalid client ID or year' });
      }

      await this.balanceSheetService.deleteBalanceSheet(clientId, year);
      res.status(204).send();
    } catch (error) {
      // Gérer les erreurs spécifiques ici
      if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  };
}

module.exports = { BalanceSheetController };

