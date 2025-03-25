const { Router } = require('express');
const { ClientController } = require('../controllers/ClientController');

const router = Router();
const clientController = new ClientController();

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */
router.get('/:id', clientController.getClient);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created
 *       400:
 *         description: Invalid input
 */
router.post('/', clientController.createClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update a client
 *     parameters:
 *       - in: path
 *         name: id
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated
 *       404:
 *         description: Client not found
 */
router.put('/:id', clientController.updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Client deleted
 *       404:
 *         description: Client not found
 */
router.delete('/:id', clientController.deleteClient);

module.exports = router;

