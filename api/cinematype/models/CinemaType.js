const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'cinematype';
  class CinemaType extends Sequelize.Model {}
  CinemaType.init({
    maCumRap: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: {
        msg: 'This cinema type already exist.',
      },
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
    CinemaType.hasMany(models.lichchieu, { as: 'Cac_Lich_Chieu_Cum_Rap' });
    CinemaType.hasMany(models.cinema, { onDelete: 'CASCADE' });
    CinemaType.belongsTo(models.cinemasystem, {
      foreignKey: 'maHeThongRap',
      as: 'He_Thong_Rap',
    });
  };
  return CinemaType;
};

