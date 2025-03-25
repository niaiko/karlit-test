module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Accounting API',
    version: '1.0.0',
    description: 'API for managing clients and their balance sheets',
  },
  servers: [
    {
      url: '/api',
      description: 'API server',
    },
  ],
  components: {
    schemas: {
      Client: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Client ID',
          },
          firstName: {
            type: 'string',
            description: 'Client first name',
          },
          lastName: {
            type: 'string',
            description: 'Client last name',
          },
        },
      },
      BalanceSheet: {
        type: 'object',
        properties: {
          clientId: {
            type: 'integer',
            description: 'Client ID',
          },
          year: {
            type: 'integer',
            description: 'Year of the balance sheet',
          },
          result: {
            type: 'number',
            format: 'float',
            description: 'Result of the balance sheet',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message',
          },
        },
      },
    },
  },
  paths: {
    // Paths à ajouter plus tard
  },
};
  
  