const { ClientService } = require('../services/ClientService');
const { validateClientCreate, validateClientUpdate } = require('../middlewares/validators/clientValidator');

class ClientController {
  constructor() {
    this.clientService = new ClientService();
  }

  getClient = async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id);
      const client = await this.clientService.getClientById(id);
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  };

  createClient = async (req, res, next) => {
    try {
      const { error, value } = validateClientCreate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const client = await this.clientService.createClient(value);
      res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  };

  updateClient = async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id);
      const { error, value } = validateClientUpdate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const client = await this.clientService.updateClient(id, value);
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  };

  deleteClient = async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id);
      await this.clientService.deleteClient(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { ClientController };

