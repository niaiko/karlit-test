const { BalanceSheetService } = require("../services/BalanceSheetService")
const {
  validateBalanceSheetCreate,
  validateBalanceSheetUpdate,
} = require("../middlewares/validators/balanceSheetValidator")

class BalanceSheetController {
  constructor() {
    this.balanceSheetService = new BalanceSheetService()
  }

  getBalanceSheetsByClientId = async (req, res, next) => {
    try {
      const clientId = Number.parseInt(req.params.clientId)
      const balanceSheets = await this.balanceSheetService.getBalanceSheetsByClientId(clientId)
      res.status(200).json(balanceSheets)
    } catch (error) {
      next(error)
    }
  }

  createBalanceSheet = async (req, res, next) => {
    try {
      const { error, value } = validateBalanceSheetCreate(req.body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }

      const balanceSheet = await this.balanceSheetService.createBalanceSheet(value)
      res.status(201).json(balanceSheet)
    } catch (error) {
      next(error)
    }
  }

  updateBalanceSheet = async (req, res, next) => {
    try {
      const clientId = Number.parseInt(req.params.clientId)
      const year = Number.parseInt(req.params.year)
      const { error, value } = validateBalanceSheetUpdate(req.body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }

      const balanceSheet = await this.balanceSheetService.updateBalanceSheet(clientId, year, value)
      res.status(200).json(balanceSheet)
    } catch (error) {
      next(error)
    }
  }

  deleteBalanceSheet = async (req, res, next) => {
    try {
      const clientId = Number.parseInt(req.params.clientId)
      const year = Number.parseInt(req.params.year)
      await this.balanceSheetService.deleteBalanceSheet(clientId, year)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { BalanceSheetController }

