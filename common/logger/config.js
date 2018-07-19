const joi = require('joi')

const envVarsSchema = joi
  .object({
    LOGGER_LEVEL: joi.string()
      .valid(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
      .default('info'),
    LOGGER_ENABLED: joi.boolean()
      .truthy('TRUE').truthy('true').truthy('1').truthy('')
      .falsy('FALSE').falsy('false').falsy('0')
      .default(true)
  })
  .unknown()
  .required()

const { value: envVars, error } = joi.validate(process.env, envVarsSchema, { abortEarly: false })
if (error) {
  // don't expose environment variables
  delete error._object
  throw error
}

const config = {
  level: envVars.LOGGER_LEVEL,
  enabled: envVars.LOGGER_ENABLED
}

module.exports = config
