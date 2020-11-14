

module.exports = (sequelize, Sequelize) => {
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
    Seat.belongsTo(models.seattype, {
      foreignKey: 'maLoaiGhe',
      as: 'maLoaiGhe_fk',
    });
    Seat.belongsTo(models.cinema, {
      foreignKey: 'maRap',
      as: 'maRap_fk',
    });
  };
  /**
       * -------------- CLASS METHOD ----------------
       */
  // eslint-disable-next-line
   
  return Seat;
};

