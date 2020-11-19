
const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'seat';
  class Seat extends Sequelize.Model {}

  // const User = db.define('User', {
  Seat.init({
    maGhe: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: {
        msg: 'This seat already exist.',
      },
    },
    maRap: {
      type: Sequelize.STRING,
    },
    tenGhe: {
      type: Sequelize.STRING,
    },
    stt: {
      type: Sequelize.STRING,
    },
    maLoaiGhe: {
      type: Sequelize.STRING,
    },
    kichHoat: {
      type: Sequelize.BOOLEAN,
    },
  }, {
    sequelize,
    timestamps: true,
    modelName,
  });
  /**
       * -------------- ASSOCIATION ----------------
       */
  Seat.associate = function (models) {
    Seat.belongsTo(models.seattype, { onDelete: 'CASCADE', as: 'Loai_Ghe', foreignKey: 'maLoaiGhe' });
    Seat.belongsTo(models.cinema, { onDelete: 'CASCADE', as: 'Cac_Cho_Ngoi_Thuoc_Rap', foreignKey: 'maRap' });
  };
  /**
       * -------------- CLASS METHOD ----------------
       */
  // eslint-disable-next-line
   
  return Seat;
};

