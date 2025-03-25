const { NotFoundError, BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

const errorHandler = (err, req, res) => {
  logger.error(err.message, { stack: err.stack });

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  if (err instanceof BadRequestError) {
    return res.status(400).json({ error: err.message });
  }

  // Default to 500 server error
  return res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

module.exports = { errorHandler };

