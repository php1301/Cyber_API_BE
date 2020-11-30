
const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'seat';
  class Seat extends Sequelize.Model {}

  // const User = db.define('User', {
  Seat.init({
    maGhe: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    maRap: {
      type: Sequelize.INTEGER,
    },
    tenGhe: {
      type: Sequelize.STRING,
    },
    stt: {
      type: Sequelize.INTEGER,
    },
    maLoaiGhe: {
      type: Sequelize.STRING,
    },
    kichHoat: {
      type: Sequelize.BOOLEAN,
    },
    maVe: {
      type: Sequelize.INTEGER,
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
    Seat.belongsTo(models.ticket, { foreignKey: 'maVe', as: 'seat_ticket' });
    Seat.belongsTo(models.seattype, { onDelete: 'CASCADE', as: 'Loai_Ghe', foreignKey: 'maLoaiGhe' });
    Seat.belongsTo(models.cinema, { onDelete: 'CASCADE', as: 'Cac_Cho_Ngoi_Thuoc_Rap', foreignKey: 'maRap' });
  };
  /**
       * -------------- CLASS METHOD ----------------
       */
  Seat.updateTrangThai = function (data, t) {
    return data.map(async (i) => {
      await Seat.update({
        kichHoat: true,
      }, {
        where: {
          maGhe: i,
        },
        transaction: t,
      });
    });
  };
  // eslint-disable-next-line
   
  return Seat;
};

