const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({path: path.join(__dirname, '../../.env')});

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(9001),
        API_SUPER_ADMIN_KEY: Joi.string().required().description('API super admin key'),
        API_KEY: Joi.string().required().description('API key'),
        AWS_ACCESS_KEY_ID: Joi.string().required().description('AWS access key id'),
        AWS_SECRET_ACCESS_KEY: Joi.string().required().description('AWS secret access key'),
        AWS_DEFAULT_REGION: Joi.string().required().description('AWS default region'),
        JWT_SECRET: Joi.string().required().description('JWT secret'),
    })
    .unknown();

const {value: envVars, error} = envVarsSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    apiKey: envVars.API_KEY,
    apiSuperAdminKey: envVars.API_SUPER_ADMIN_KEY,
    AWS: {
        accessKey: envVars.AWS_ACCESS_KEY_ID,
        secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
        region: envVars.AWS_DEFAULT_REGION,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
    },
};