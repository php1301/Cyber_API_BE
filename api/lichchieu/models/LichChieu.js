const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'lichchieu';
  class LichChieu extends Sequelize.Model {}

  LichChieu.init({
    maLichChieu: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: {
        msg: 'maLichChieu existed',
      },
    },
    maRap: {
      type: Sequelize.STRING,
    },
    maPhim: {
      type: Sequelize.STRING,
    },
    ngayChieu: {
      type: Sequelize.STRING,
    },
    giaVe: {
      type: Sequelize.FLOAT,
    },
    thoiLuong: {
      type: Sequelize.INTEGER,
    },
    maNhom: {
      type: Sequelize.STRING,
    },
    maHeThongRap: {
      type: Sequelize.STRING,
    },
    maCumRap: {
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
  LichChieu.associate = function (models) {
    LichChieu.belongsTo(models.cinema, {
      foreignKey: 'maRap',
      as: 'Cac_Lich_Chieu_rap',
    });
    LichChieu.belongsTo(models.phim, {
      foreignKey: 'maPhim',
      as: 'Phim_Lich_Chieu',
    });
    LichChieu.belongsToMany(models.nhom, {
      through: 'LichChieu_Nhom',
    });
    LichChieu.belongsTo(models.cinematype, {
      foreignKey: 'maCumRap',
      as: 'Cac_Lich_Chieu_Cum_Rap',
    });
    LichChieu.belongsTo(models.cinemasystem, {
      foreignKey: 'maHeThongRap',
      as: 'Cac_Lich_Chieu_He_Thong_Rap',
    });
    /**
     * -------------- SCOPE ----------------
     */
    LichChieu.addScope('rapGhe', {
      include: [
        {
          model: models.cinema,
          required: true, // Inner Join
          include: [
            {
              model: models.seat,
              required: true,
            },
          ],
        },
      ],
    });
  };
  return LichChieu;
};
