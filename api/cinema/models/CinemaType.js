const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'cinematype';
  class CinemaType extends Sequelize.Model {}
  CinemaType.init({
    maCumRap: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    tenCumRap: {
      type: Sequelize.STRING,
    },
    thongTin: {
      type: Sequelize.STRING,
    },
    maHeThongRap: {
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
  CinemaType.associate = function (models) {
    CinemaType.hasMany(models.lichchieu, { as: 'cacLichChieuCumRap' });
    CinemaType.hasMany(models.cinema, { onDelete: 'CASCADE', as: 'cacRapCuaCumRap' });
    CinemaType.belongsTo(models.cinemasystem, {
      foreignKey: 'maHeThongRap',
      as: 'He_Thong_Rap',
    });
  };
  return CinemaType;
};

