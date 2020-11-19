const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'phim';
  class Phim extends Sequelize.Model {}

  // const Phim = db.define('Phim', {
  Phim.init({
    maPhim: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    tenPhim: {
      type: Sequelize.STRING,
    },
    trailer: {
      type: Sequelize.STRING,
    },
    hinhAnh: {
      type: Sequelize.STRING,
    },
    moTa: {
      type: Sequelize.STRING,
    },
    maNhom: {
      type: Sequelize.STRING,
    },
    ngayKhoiChieu: {
      type: Sequelize.STRING,
    },
    danhGia: {
      type: Sequelize.FLOAT,
    },
    daXoa: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    biDanh: {
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
  Phim.associate = function (models) {
    Phim.belongsToMany(models.nhom, {
      through: 'Phim_Nhom',
    });
    Phim.hasOne(models.lichchieu);
  };
  /**
     * -------------- CLASS METHOD ----------------
     */
  // eslint-disable-next-line
    Phim.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
  };
  return Phim;
};
