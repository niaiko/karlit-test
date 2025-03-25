const BalanceSheet = require('../models/BalanceSheet');
const { Op } = require('sequelize');

class BalanceSheetRepository {
  async findByClientId(clientId) {
    return BalanceSheet.findAll({
      where: { clientId },
    });
  }

  async findByClientIdAndYear(clientId, year) {
    return BalanceSheet.findOne({
      where: {
        clientId,
        year,
      },
    });
  }

  async create(balanceSheetData) {
    return BalanceSheet.create(balanceSheetData);
  }

  async update(clientId, year, balanceSheetData) {
    const [updated] = await BalanceSheet.update(balanceSheetData, {
      where: {
        clientId,
        year,
      },
    });

    if (updated) {
      return this.findByClientIdAndYear(clientId, year);
    }
    return null;
  }

  async delete(clientId, year) {
    const deleted = await BalanceSheet.destroy({
      where: {
        clientId,
        year,
      },
    });
    return deleted > 0;
  }

  async compareBalanceSheets(clientIds) {
    const confirmedDuplicates = [];

    for (const group of clientIds) {
      const balanceSheetsByClient = new Map();

      // Récupérer tous les bilans pour ce groupe de clients
      const balanceSheets = await BalanceSheet.findAll({
        where: {
          clientId: {
            [Op.in]: group,
          },
        },
      });

      // Organiser par client et année
      for (const bs of balanceSheets) {
        if (!balanceSheetsByClient.has(bs.clientId)) {
          balanceSheetsByClient.set(bs.clientId, new Map());
        }
        balanceSheetsByClient.get(bs.clientId).set(bs.year, bs.result);
      }

      // Vérifier les doublons
      const isDuplicate = this.checkDuplicateBalanceSheets(balanceSheetsByClient);
      if (isDuplicate) {
        confirmedDuplicates.push(group);
      }
    }

    return confirmedDuplicates;
  }

  checkDuplicateBalanceSheets(balanceSheetsByClient) {
    const clientIds = Array.from(balanceSheetsByClient.keys());

    // Comparer chaque paire de clients
    for (let i = 0; i < clientIds.length; i++) {
      for (let j = i + 1; j < clientIds.length; j++) {
        const client1Sheets = balanceSheetsByClient.get(clientIds[i]);
        const client2Sheets = balanceSheetsByClient.get(clientIds[j]);

        // Vérifier si des années communes ont des résultats différents
        let isDuplicate = true;

        for (const [year, result1] of client1Sheets.entries()) {
          if (client2Sheets.has(year) && Number.parseFloat(client2Sheets.get(year)) !== Number.parseFloat(result1)) {
            isDuplicate = false;
            break;
          }
        }

        if (isDuplicate) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = { BalanceSheetRepository };

