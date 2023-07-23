const config = require('./config');

module.exports = {
    host: config.dbHost,
    // port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    dialect: 'postgres',
    dialectOptions:
        process.env.NODE_ENV === 'production'
            ? {
                  bigNumberStrings: true,
                  ssl: {
                      require: true,
                      rejectUnauthorized: false
                  }
              }
            : null,
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
