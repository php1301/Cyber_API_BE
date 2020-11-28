const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  // CGV...
  const modelName = 'cinemasystem';
  class CinemaSystem extends Sequelize.Model {}
  CinemaSystem.init({
    maHeThongRap: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    tenHeThongRap: {
      type: Sequelize.STRING,
    },
    biDanh: {
      type: Sequelize.STRING,
    },
    logo: {
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
  CinemaSystem.associate = function (models) {
    CinemaSystem.hasMany(models.lichchieu, {
      onDelete: 'CASCADE',
      as: 'lichchieu_hethongrap',
    });
    CinemaSystem.hasMany(models.cinematype, {
      onDelete: 'CASCADE',
      as: 'lstCumRap',
    });
    CinemaSystem.hasMany(models.cinematype, {
      onDelete: 'CASCADE',
      as: 'cumRapChieu',
    });
    /**
     * -------------- SCOPE ----------------
     */
    CinemaSystem.addScope('lichChieuCacPhimHeThongRap', {
      include: [{
        model: models.cinematype,
        required: true,
        as: 'lstCumRap',
        attributes: {
          include: ['maCumRap', 'tenCumRap', 'diaChi'],
        },
        include: [{
          model: models.lichchieu,
          as: 'cacLichChieuCumRap',
          attributes: {
            include: ['maLichChieu', 'tenRap', 'maRap', 'ngayChieuGioChieu', 'giaVe'],
          },
          required: true,
          include: [{
            model: models.phim,
            attributes: {
              include: ['maPhim', 'tenPhim', 'hinhAnh'],
            },
            as: 'lichChieuCuaPhim',
          }],
        }],
      }],
    });
    CinemaSystem.addScope('thongTinCumRapTheoHeThong', {
      include: [{
        model: models.cinematype,
        required: true,
        as: 'lstCumRap',
        attributes: {
          include: ['maCumRap', 'tenCumRap', 'diaChi'],
        },
        include: [{
          model: models.cinema,
          as: 'cacRapCuaCumRap',
          required: true,
          attributes: {
            include: ['maRap', 'tenRap'],
          },
        }],
      }],
    });
  };
  return CinemaSystem;
};

