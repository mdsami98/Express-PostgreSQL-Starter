const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const configValidation = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid('production', 'development', 'test')
            .required(),
        PORT: Joi.number().default(9000),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(60)
            .description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which verify email token expires'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_NAME: Joi.string().required()
    })
    .unknown();
const { value: envVars, error } = configValidation
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    dbHost: envVars.DB_HOST,
    dbPort: envVars.DB_PORT,
    dbPassword: envVars.DB_PASSWORD,
    dbUser: envVars.DB_USER,
    dbName: envVars.DB_NAME,

    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes:
            envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes:
            envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    }
};
