const Joi = require("joi")

const validateClientCreate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().max(100),
    lastName: Joi.string().required().max(100),
  })

  return schema.validate(data)
}

const validateClientUpdate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().max(100),
    lastName: Joi.string().max(100),
  }).min(1)

  return schema.validate(data)
}

module.exports = { validateClientCreate, validateClientUpdate }

