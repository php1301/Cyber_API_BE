const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'usertype';
  class UserType extends Sequelize.Model {}
  UserType.init({
    maLoaiNguoiDung: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: {
        msg: 'This user type already exist.',
      },
    },
    tenLoai: {
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
  UserType.associate = function (models) {
    UserType.hasMany(models.user);
  };
  return UserType;
};
