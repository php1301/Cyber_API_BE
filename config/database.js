
const connection = require('./connection');
const { Sequelize } = require('sequelize');

let database;

// database name, username, password, config {host, dialect, pool {max, min, idle}}
switch (process.env.NODE_ENV) {
  case 'testing':
    database = new Sequelize(
      connection.testing.database,
      connection.testing.username,
      connection.testing.password, {
        host: connection.testing.host,
        dialect: connection.testing.dialect,
        pool: {
          min: 0,
          max: 5,
          idle: 10000,
        },
      },
    );
    break;
  case 'production':
    database = new Sequelize(
      connection.production.database,
      connection.production.username,
      connection.production.password, {
        host: connection.production.host,
        dialect: connection.production.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  default:
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password,
      {
        host: connection.development.host,
        dialect: connection.development.dialect,
        pool: {
          min: 0,
          max: 5,
          idle: 10000,
        },
        logging: false,
        define: {
          freezeTableName: true,
        },
      },
    );
    break;
}

module.exports = database;

