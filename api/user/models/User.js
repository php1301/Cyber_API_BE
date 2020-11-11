const Sequelize = require('sequelize');

const db = require('../../../config/database');

const modelName = 'users';

class User extends Sequelize.Model {}

// const User = db.define('User', {
User.init({
  taiKhoan: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: 'User with this email already exist.',
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  soDT: {
    type: Sequelize.STRING,
  },
  hoTen: {
    type: Sequelize.STRING,
  },
  daXoa: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  SSID: {
    type: Sequelize.STRING,
  },
  secretKey: {
    type: Sequelize.STRING,
  },
  biDanh: {
    type: Sequelize.STRING,
  },
}, {
  sequelize: db,
  timestamps: true,
  modelName,
});
User.sync();
/**
     * -------------- CLASS METHOD ----------------
     */


// eslint-disable-next-line
User.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;
