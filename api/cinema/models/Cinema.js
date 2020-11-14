
module.exports = (sequelize, Sequelize) => {
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
    Cinema.belongsTo(models.cinematype, {
      foreignKey: 'maCumRap',
      as: 'maCumRap_fk',
    });
    Cinema.hasMany(models.seat, {
      onDelete: 'CASCADE',
    });
  };
  return Cinema;
};

