const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = () => {
  const modelName = 'lichchieu';
  class LichChieu extends Sequelize.Model {}

  LichChieu.init({
    maLichChieu: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    maRap: {
      type: Sequelize.INTEGER,
    },
    maPhim: {
      type: Sequelize.INTEGER,
    },
    ngayChieu: {
      type: Sequelize.DATE,
    },
    giaVe: {
      type: Sequelize.FLOAT,
    },
    thoiLuong: {
      type: Sequelize.INTEGER,
    },
    maNhom: {
      type: Sequelize.STRING,
    },
    maHeThongRap: {
      type: Sequelize.STRING,
    },
    maCumRap: {
      type: Sequelize.STRING,
    },
    gioChieu: {
      type: Sequelize.VIRTUAL,
      get() {
        const time = this.ngayChieu.getTime();
        const timeFormat = new Date(time);
        const timeResult = `${timeFormat.getHours()}:${timeFormat.getMinutes()} - GMT + 7`;
        return timeResult;
      },
    },

  }, {
    sequelize,
    timestamps: true,
    modelName,
  });

  /**
     * -------------- ASSOCIATION ----------------
     */
  LichChieu.associate = function (models) {
    LichChieu.belongsTo(models.cinema, {
      foreignKey: 'maRap',
      as: 'cacLichChieuRap',
      hooks: true,
    });
    LichChieu.belongsTo(models.phim, {
      foreignKey: 'maPhim',
      as: 'lichChieuCuaPhim',
      hooks: true,
    });
    LichChieu.belongsToMany(models.nhom, {
      through: 'LichChieu_Nhom',
    });
    LichChieu.belongsTo(models.cinematype, {
      foreignKey: 'maCumRap',
      as: 'cacLichChieuCumRap',
    });
    LichChieu.belongsTo(models.cinemasystem, {
      foreignKey: 'maHeThongRap',
      as: 'cacLichChieuHeThongRap',
    });
    /**
     * -------------- SCOPE ----------------
     */
    LichChieu.addScope('thongTinLichChieu', {
      attributes: ['maLichChieu', 'ngayChieu', 'gioChieu'],
      include: [
        {
          model: models.phim,
          as: 'lichChieuCuaPhim',
          attributes: ['maPhim', 'tenPhim', 'hinhAnh'],
          required: true,
        },
        {
          model: models.cinematype,
          as: 'cacLichChieuCumRap',
          attributes: ['maCumRap', 'tenCumRap'],
          required: true,
        },
        {
          model: models.cinema,
          as: 'cacLichChieuRap',
          required: true, // Inner Join
          include: [
            {
              model: models.seat,
              as: 'cacChoNgoiTrongRap',
              required: true,
            },
          ],
        },
      ],
    });
    LichChieu.addScope('gheCuaLichChieu', {
      attributes: ['maLichChieu', 'ngayChieu', 'gioChieu'],
      include: [
        {
          model: models.cinema,
          as: 'cacLichChieuRap',
          required: true, // Inner Join
          include: [
            {
              model: models.seat,
              as: 'cacChoNgoiTrongRap',
              required: true,
            },
          ],
        },
      ],
    });
    /**
     * -------------- HOOKS ----------------
     */
    LichChieu.addHook('beforeCreate', 'ngayChieuVaNgayKhoiChieu', async (lichchieu, options) => {
      const ngayKhoiChieu = await models.phim.findByPk(lichchieu.maPhim, {
        attributes: ['ngayKhoiChieu'],
      });
      if (ngayKhoiChieu.ngayKhoiChieu > lichchieu.ngayChieu) {
        return options.transaction.rollback().then((_) => { throw EvalError('Ngay Chieu phai lon hon Ngay Khoi Chieu'); });
      }
      // if(models.phim.ngayKhoiChieu <)
    });
  };
  return LichChieu;
};
