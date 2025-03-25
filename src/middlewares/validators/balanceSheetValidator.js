const Joi = require('joi');

const validateBalanceSheetCreate = (data) => {
  const schema = Joi.object({
    clientId: Joi.number().integer().required(),
    year: Joi.number().integer().min(1900).max(2100).required(),
    result: Joi.number().required(),
  });

  return schema.validate(data);
};

const validateBalanceSheetUpdate = (data) => {
  const schema = Joi.object({
    result: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = { validateBalanceSheetCreate, validateBalanceSheetUpdate };

