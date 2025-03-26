const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorHandler');
const clientRoutes = require('./routes/clientRoutes');
const balanceSheetRoutes = require('./routes/balanceSheetRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const { testConnection } = require('./config/database');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// API Documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Accounting API Documentation',
    customfavIcon: 'https://nodejs.org/static/images/logo.svg',
  }),
);

// Redirection de la racine vers la documentation
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/balance-sheets', balanceSheetRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Database connection check endpoint
app.get('/api/db-check', async (req, res) => {
  const isConnected = await testConnection();
  if (isConnected) {
    res.status(200).json({ status: 'connected', message: 'Database connection successful' });
  } else {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

