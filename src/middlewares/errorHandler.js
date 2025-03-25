const { NotFoundError, BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

const errorHandler = (err, req, res) => {
  // Log l'erreur avec plus de détails en développement
  if (process.env.NODE_ENV === 'development') {
    console.error('Error details:', err);
  }

  logger.error(`Error handling request to ${req.method} ${req.url}: ${err.message}`, {
    stack: err.stack,
    error: err.toString(),
  });

  // Gérer les erreurs spécifiques
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  if (err instanceof BadRequestError) {
    return res.status(400).json({ error: err.message });
  }

  // Gérer les erreurs Sequelize
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map((e) => e.message),
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Foreign Key Constraint Error',
      message: 'The referenced entity does not exist',
    });
  }

  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      error: 'Database Connection Error',
      message: 'Unable to connect to the database',
    });
  }

  // Default to 500 server error
  return res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

module.exports = { errorHandler };

