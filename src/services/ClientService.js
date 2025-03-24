const { ClientRepository } = require("../repositories/ClientRepository")
const { NotFoundError } = require("../utils/errors")

class ClientService {
  constructor() {
    this.clientRepository = new ClientRepository()
  }

  async getClientById(id) {
    const client = await this.clientRepository.findById(id)
    if (!client) {
      throw new NotFoundError(`Client with id ${id} not found`)
    }
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
    }
  }

  async createClient(clientData) {
    const client = await this.clientRepository.create(clientData)
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
    }
  }

  async updateClient(id, clientData) {
    const client = await this.clientRepository.update(id, clientData)
    if (!client) {
      throw new NotFoundError(`Client with id ${id} not found`)
    }
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
    }
  }

  async deleteClient(id) {
    const deleted = await this.clientRepository.delete(id)
    if (!deleted) {
      throw new NotFoundError(`Client with id ${id} not found`)
    }
  }
}

module.exports = { ClientService }

