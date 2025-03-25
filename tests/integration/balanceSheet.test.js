const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/config/database');
const Client = require('../../src/models/Client');
const BalanceSheet = require('../../src/models/BalanceSheet');

describe('Balance Sheet API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Recréer les tables
  });

  afterAll(async () => {
    await sequelize.close();
  });

  let testClientId;

  beforeEach(async () => {
    // Créer un client de test
    const client = await Client.create({
      firstName: 'Test',
      lastName: 'User',
    });
    testClientId = client.id;
  });

  afterEach(async () => {
    // Nettoyer
    await BalanceSheet.destroy({ where: {} });
    await Client.destroy({ where: {} });
  });

  describe('GET /api/balance-sheets/client/:clientId', () => {
    it('should return all balance sheets for a client', async () => {
      // Créer des bilans de test
      await BalanceSheet.bulkCreate([
        {
          clientId: testClientId,
          year: 2020,
          result: 1000.5,
        },
        {
          clientId: testClientId,
          year: 2021,
          result: 1500.75,
        },
      ]);

      const response = await request(app).get(`/api/balance-sheets/client/${testClientId}`).expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].year).toBe(2020);
      // Utiliser parseFloat pour comparer les valeurs numériques
      expect(Number.parseFloat(response.body[0].result)).toBe(1000.5);
      expect(response.body[1].year).toBe(2021);
      expect(Number.parseFloat(response.body[1].result)).toBe(1500.75);
    });

    it('should return 404 if client does not exist', async () => {
      await request(app).get('/api/balance-sheets/client/999').expect(404);
    });
  });

  describe('POST /api/balance-sheets', () => {
    it('should create a new balance sheet', async () => {
      const response = await request(app)
        .post('/api/balance-sheets')
        .send({
          clientId: testClientId,
          year: 2022,
          result: 2000.25,
        })
        .expect(201);

      expect(response.body.clientId).toBe(testClientId);
      expect(response.body.year).toBe(2022);
      expect(Number.parseFloat(response.body.result)).toBe(2000.25);

      // Vérifier qu'il a été enregistré dans la base de données
      const balanceSheet = await BalanceSheet.findOne({
        where: { clientId: testClientId, year: 2022 },
      });
      expect(balanceSheet).toBeTruthy();
      expect(Number.parseFloat(balanceSheet.result)).toBe(2000.25);
    });

    it('should return 400 if balance sheet already exists for that year', async () => {
      // Créer un bilan d'abord
      await BalanceSheet.create({
        clientId: testClientId,
        year: 2023,
        result: 2500.0,
      });

      // Essayer d'en créer un autre pour la même année
      await request(app)
        .post('/api/balance-sheets')
        .send({
          clientId: testClientId,
          year: 2023,
          result: 3000.0,
        })
        .expect(400);
    });
  });

  describe('PUT /api/balance-sheets/client/:clientId/year/:year', () => {
    it('should update an existing balance sheet', async () => {
      // Créer un bilan d'abord
      await BalanceSheet.create({
        clientId: testClientId,
        year: 2024,
        result: 3000.0,
      });

      // Le mettre à jour
      const response = await request(app)
        .put(`/api/balance-sheets/client/${testClientId}/year/2024`)
        .send({
          result: 3500.5,
        })
        .expect(200);

      expect(Number.parseFloat(response.body.result)).toBe(3500.5);

      // Vérifier qu'il a été mis à jour dans la base de données
      const balanceSheet = await BalanceSheet.findOne({
        where: { clientId: testClientId, year: 2024 },
      });
      expect(Number.parseFloat(balanceSheet.result)).toBe(3500.5);
    });

    it('should return 404 if balance sheet does not exist', async () => {
      await request(app)
        .put(`/api/balance-sheets/client/${testClientId}/year/2025`)
        .send({
          result: 4000.0,
        })
        .expect(404);
    });
  });

  describe('DELETE /api/balance-sheets/client/:clientId/year/:year', () => {
    it('should delete an existing balance sheet', async () => {
      // Créer un bilan d'abord
      await BalanceSheet.create({
        clientId: testClientId,
        year: 2026,
        result: 4500.0,
      });

      // Le supprimer
      await request(app).delete(`/api/balance-sheets/client/${testClientId}/year/2026`).expect(204);

      // Vérifier qu'il a été supprimé de la base de données
      const balanceSheet = await BalanceSheet.findOne({
        where: { clientId: testClientId, year: 2026 },
      });
      expect(balanceSheet).toBeNull();
    });

    it('should return 404 if balance sheet does not exist', async () => {
      await request(app).delete(`/api/balance-sheets/client/${testClientId}/year/2027`).expect(404);
    });
  });
});

