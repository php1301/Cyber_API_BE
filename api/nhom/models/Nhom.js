const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'nhom';
  class Nhom extends Sequelize.Model {}

  // const Nhom = db.define('Nhom', {
  Nhom.init({
    maNhom: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    tenNhom: {
      type: Sequelize.STRING,
    },

  }, {
    sequelize,
    timestamps: true,
    modelName,
  });
  /**
     * -------------- ASSOCIATION ----------------
     */
  Nhom.associate = function (models) {
    Nhom.belongsToMany(models.phim, {
      through: 'Phim_Nhom',
    });
    Nhom.belongsToMany(models.lichchieu, {
      through: 'LichChieu_Nhom',
    });
  };
  /**
     * -------------- CLASS METHOD ----------------
     */
  // eslint-disable-next-line
    Nhom.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
  };
  return Nhom;
};
