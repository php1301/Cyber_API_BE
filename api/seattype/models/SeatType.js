const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');


module.exports = () => {
  const modelName = 'seattype';
  class SeatType extends Sequelize.Model {}

  // const User = db.define('User', {
  SeatType.init({
    maLoaiGhe: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: {
        msg: 'This SeatType already exist.',
      },
    },
    tenLoaiGhe: {
      type: Sequelize.STRING,
    },
    moTa: {
      type: Sequelize.STRING,
    },
    chietKhau: {
      type: Sequelize.FLOAT,
    },
  }, {
    sequelize,
    timestamps: true,
    modelName,
  });
  /**
         * -------------- ASSOCIATION ----------------
         */
  SeatType.associate = function (models) {
    SeatType.hasMany(models.seat);
  };
  /**
         * -------------- CLASS METHOD ----------------
         */
  // eslint-disable-next-line
     
  return SeatType;
};

