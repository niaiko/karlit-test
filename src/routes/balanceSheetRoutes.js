const { Router } = require("express")
const { BalanceSheetController } = require("../controllers/BalanceSheetController")

const router = Router()
const balanceSheetController = new BalanceSheetController()

/**
 * @swagger
 * /api/balance-sheets/client/{clientId}:
 *   get:
 *     summary: Get all balance sheets for a client
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Balance sheets found
 *       404:
 *         description: Client not found
 */
router.get("/client/:clientId", balanceSheetController.getBalanceSheetsByClientId)

/**
 * @swagger
 * /api/balance-sheets:
 *   post:
 *     summary: Create a new balance sheet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *               year:
 *                 type: integer
 *               result:
 *                 type: number
 *     responses:
 *       201:
 *         description: Balance sheet created
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Client not found
 */
router.post("/", balanceSheetController.createBalanceSheet)

/**
 * @swagger
 * /api/balance-sheets/client/{clientId}/year/{year}:
 *   put:
 *     summary: Update a balance sheet
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               result:
 *                 type: number
 *     responses:
 *       200:
 *         description: Balance sheet updated
 *       404:
 *         description: Balance sheet not found
 */
router.put("/client/:clientId/year/:year", balanceSheetController.updateBalanceSheet)

/**
 * @swagger
 * /api/balance-sheets/client/{clientId}/year/{year}:
 *   delete:
 *     summary: Delete a balance sheet
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Balance sheet deleted
 *       404:
 *         description: Balance sheet not found
 */
router.delete("/client/:clientId/year/:year", balanceSheetController.deleteBalanceSheet)

module.exports = router

