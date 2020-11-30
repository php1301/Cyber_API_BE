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
      foreignKey: 'maHeThongRap',
    });
    CinemaSystem.hasMany(models.cinematype, {
      onDelete: 'CASCADE',
      as: 'lstCumRap',
      foreignKey: 'maHeThongRap',
    });
    CinemaSystem.hasMany(models.cinematype, {
      onDelete: 'CASCADE',
      as: 'cumRapChieu',
      foreignKey: 'maHeThongRap',
    });
    /**
     * -------------- SCOPE ----------------
     */
    CinemaSystem.addScope('lichChieuCacPhimHeThongRap', {
      include: [{
        model: models.lichchieu,
        as: 'lichchieu_hethongrap',
        required: true,
        include: [
          {
            model: models.cinematype,
            as: 'cacLichChieuCumRap',
            required: true,
          },
          {
            model: models.phim,
            as: 'lichChieuCuaPhim',
            required: true,
            attributes: ['maPhim', 'tenPhim', 'hinhAnh'],
          },
          {
            model: models.cinema,
            as: 'cacLichChieuRap',
            required: true,
          },
        ]
        ,
      }],
    });
    CinemaSystem.addScope('thongTinCumRapTheoHeThong', {
      include: [{
        model: models.cinematype,
        required: true,
        as: 'lstCumRap',
        attributes: {
          include: ['maCumRap', 'tenCumRap'],
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
    CinemaSystem.addScope('thongTinCumRapTheoHeThongKhongGomRap', {
      include: [{
        model: models.cinematype,
        required: true,
        as: 'lstCumRap',
        attributes: {
          include: ['maCumRap', 'tenCumRap'],
        },
      }],
    });
  };
  return CinemaSystem;
};

