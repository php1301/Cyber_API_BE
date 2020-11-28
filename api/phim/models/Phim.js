const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'phim';
  class Phim extends Sequelize.Model {}

  // const Phim = db.define('Phim', {
  Phim.init({
    maPhim: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: Sequelize.DATE,
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
    Phim.hasMany(models.lichchieu, { as: 'cacLichChieuCuaPhim', foreignKey: 'maPhim' });
    /**
     * -------------- SCOPE ----------------
     */
    Phim.addScope('layThongTinLichChieuPhim', {
      include: [{
        model: models.lichchieu,
        required: true,
        as: 'cacLichChieuCuaPhim',
        attributes: {
          include: ['maLichChieu', [Sequelize.col('cinema.tenRap'), 'tenRap'], 'thoiLuong', 'giaVe', 'ngayChieuGioChieu'],
        },
        include: [{
          model: models.cinemasystem,
          required: true,
          attributes: {
            include: ['maHeThongRap', 'tenHeThongRap', 'logo'],
          },
          as: 'cacLichChieuHeThongRap',
          include: [{
            model: models.cinematype,
            required: true,
            as: 'cumRapChieu',
            attributes: {
              include: ['maCumRap, tenCumRap, hinhAnh'],
            },
          }],
        }],
      }],
    });
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
