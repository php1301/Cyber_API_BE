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
      unique: {
        msg: 'This cinema type already exist.',
      },
    },
    tenHeThongRap: {
      type: Sequelize.STRING,
    },
    biDanh: {
      type: Sequelize.STRING,
    },
    maCumRap: {
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
    });
    CinemaSystem.hasMany(models.cinematype, {
      onDelete: 'CASCADE',
    });
  };
  return CinemaSystem;
};

