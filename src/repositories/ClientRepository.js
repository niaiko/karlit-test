const { Client } = require("../models")
const { Op } = require("sequelize")
const { sequelize } = require("../config/database")

class ClientRepository {
  async findById(id) {
    return Client.findByPk(id)
  }

  async findAll() {
    return Client.findAll()
  }

  async create(clientData) {
    return Client.create(clientData)
  }

  async update(id, clientData) {
    const [updated] = await Client.update(clientData, {
      where: { id },
    })

    if (updated) {
      return this.findById(id)
    }
    return null
  }

  async delete(id) {
    const deleted = await Client.destroy({
      where: { id },
    })
    return deleted > 0
  }

  async findDuplicates() {
    // Trouver les clients avec les mêmes noms et prénoms
    const duplicates = await Client.findAll({
      attributes: ["firstName", "lastName", [sequelize.fn("GROUP_CONCAT", sequelize.col("id")), "ids"]],
      group: ["firstName", "lastName"],
      having: sequelize.literal("COUNT(*) > 1"),
    })

    // Transformer les résultats en tableau d'IDs
    return duplicates.map((dup) => dup.getDataValue("ids").split(",").map(Number))
  }
}

module.exports = { ClientRepository }

