require('dotenv').config();
const { sequelize } = require('./config/database');
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

// Initialize database connection
sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connection established');

    // Synchronize models with database
    // Force: false - This creates the table if it doesn't exist (and does nothing if it already exists)
    return sequelize.sync({ force: false });
  })
  .then(() => {
    logger.info('Database synchronized');

    // Start the server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    logger.error('Error during database initialization', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

