require('dotenv').config();
module.exports = {
    development: {
        username: process.env.SEQUELIZE_NAME,
        password: process.env.SEQUELIZE_PASSWORD,
        database: process.env.SEQUELIZE_DB,
        host: process.env.SEQUELIZE_HOST,
        dialect: 'mysql',
        port: process.env.SEQUELIZE_PORT,
        operatorsAliases: 'false',
    },
      production: {
        username: process.env.SEQUELIZE_NAME,
        password: process.env.SEQUELIZE_PASSWORD,
        database: process.env.SEQUELIZE_DB,
        host: process.env.SEQUELIZE_HOST,
        dialect: 'mysql',
        port: process.env.SEQUELIZE_PORT,
        operatorsAliases: 'false',
        logging: false,
      }
}