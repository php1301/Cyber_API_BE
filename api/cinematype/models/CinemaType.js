
module.exports = (sequelize, Sequelize) => {
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
    CinemaType.hasMany(models.cinema);
    CinemaType.belongsTo(models.cinemasystem, {
      foreignKey: 'maHeThongRap',
      as: 'maHeThongRap_fk',
    });
  };
  return CinemaType;
};

