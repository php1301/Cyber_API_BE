const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'cinema';
  class Cinema extends Sequelize.Model {}
  Cinema.init({
    maRap: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: {
        msg: 'This cinema already exist.',
      },
    },
    tenRap: {
      type: Sequelize.STRING,
    },
    soGhe: {
      type: Sequelize.INTEGER,
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
  Cinema.associate = function (models) {
    Cinema.hasMany(models.lichchieu, { as: 'Cac_Lich_Chieu_Cua_Rap' });
    Cinema.belongsTo(models.cinematype, {
      as: 'Thuoc_Cum_Rap',
    });
    Cinema.hasMany(models.seat, {
      foreignKey: 'maRap',
      as: 'Cac_Cho_Ngoi_Trong_Rap',
    });
  };
  return Cinema;
};

