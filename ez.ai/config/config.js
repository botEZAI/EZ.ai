require('dotenv').config();
module.exports = {
    development: {
        username: 'root',
        password:process.env.SEQUELIZE_PASSWORD,
        database: 'ezaidb2',
        host: process.env.SEQUELIZE_HOST,
        dialect: 'mysql',
        port:'3306',
        operatorsAliases: 'false',
    },
      production: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'ezaidb2',
        host: process.env.SEQUELIZE_HOST,
        port:'3306',
        dialect: 'mysql',
        operatorsAliases: 'false',
        logging: false,
      }
}