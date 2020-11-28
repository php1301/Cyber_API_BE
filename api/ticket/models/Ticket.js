const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'ticket';
  class Ticket extends Sequelize.Model {}

  Ticket.init({
    maVe: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ngayDat: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    giaVe: {
      type: Sequelize.STRING,
    },
    taiKhoanNguoiDung: {
      type: Sequelize.INTEGER,
    },
    maLichChieu: {
      type: Sequelize.INTEGER,
    },
    soDT: {
      type: Sequelize.STRING,
    },
    loaiGhe: {
      type: Sequelize.STRING,
    },
    chietKhau: {
      type: Sequelize.FLOAT,
    },
  }, {
    sequelize,
    createdAt: 'ngayDat',
    updatedAt: 'updatedAt',
    modelName,
  });
  /**
     * -------------- ASSOCIATION ----------------
     */
  Ticket.associate = function (models) {
    Ticket.hasMany(models.seat, { onDelete: 'CASCADE', as: 'seat_ticket', foreignKey: 'maVe' });
    Ticket.belongsTo(models.user, {
      foreignKey: 'taiKhoanNguoiDung',
      as: 'taiKhoanNguoiDung_ticket',
    });
    Ticket.belongsTo(models.lichchieu, {
      foreignKey: 'maLichChieu',
      as: 'maLichChieu_ticket',
    });
    /**
           * -------------- SCOPES ----------------
           */
    // Ticket.addScope('datVe', {
    //   include: [
    //     {
    //       model: models.usertype,
    //       as: 'role',
    //       required: true,
    //       attributes: {
    //         exclude: ['id', 'description'],
    //       },
    //     },
    //   ],
    // });
  };
  /**
     * -------------- CLASS METHOD ----------------
     */
  // eslint-disable-next-line
    Ticket.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
  };
  return Ticket;
};
