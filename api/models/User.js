const Sequelize = require('sequelize');

const db = require('../../config/database');

const tableName = 'users';

const User = db.define('User', {
  TaiKhoan: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Email: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: 'User with this email already exist.',
    },
  },
  MatKhau: {
    type: Sequelize.STRING,
  },
  SoDT: {
    type: Sequelize.STRING,
  },
  HoTen: {
    type: Sequelize.STRING,
  },
  DaXoa: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  SSID: {
    type: Sequelize.STRING,
  },
  SecretKey: {
    type: Sequelize.STRING,
  },
  BiDanh: {
    type: Sequelize.STRING,
  },
}, { tableName });
User.sync();
// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;
