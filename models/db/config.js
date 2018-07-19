const joi = require('joi')

const envVarsSchema = joi
  .object({
    MONGODB_USERNAME: joi.string(),
    MONGODB_PASSWORD: joi.string(),
    MONGODB_URI: joi
      .string()
      .uri({ scheme: 'mongodb' })
      .default('mongodb://localhost/nodejs-example'),
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
  username: envVars.MONGODB_USERNAME,
  password: envVars.MONGODB_PASSWORD,
  uri: envVars.MONGODB_URI
}

module.exports = config
