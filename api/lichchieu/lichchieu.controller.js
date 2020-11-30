const Sequelize = require('sequelize');
const model = require('./models/LichChieu');
const models = require('../../services/db.service');

const LichChieuController = () => {
  const taoLichChieu = async (req, res) => {
    const db = models().generateModel(false);
    const {
      maPhim, ngayChieu, maRap, giaVe,
    } = req.body;
    try {
      const result = await db.sequelize.transaction(async (t) => {
        const maCumRap = await db.cinema.findOne({
          where: {
            maRap,
          },
          attributes: ['maCumRap'],
        }, {
          include: db.cinematype,
          as: 'Thuoc_Cum_Rap',
        });
        const maHeThongRap = await db.cinematype.findOne({
          where: {
            maCumRap: maCumRap.maCumRap,
          },
          attributes: ['maHeThongRap'],
        }, {
          include: db.cinematype,
          as: 'He_Thong_Rap',
        });

        const lichChieu = await db.lichchieu.create({
          maPhim,
          ngayChieu: new Date(ngayChieu),
          maRap,
          giaVe,
          maCumRap: maCumRap.maCumRap,
          maHeThongRap: maHeThongRap.maHeThongRap,
        }, {
          transaction: t,
        });
        return lichChieu;
      });
      return res.status(200).json({ result });
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  };
  const layThongTinLichChieu = async (req, res) => {
    const { maLichChieu } = req.query;
    if (maLichChieu) {
      const db = models().generateModel(false);
      try {
        const result = await db.sequelize.transaction(async (t) => {
          const thongTinLichChieu = await db.lichchieu.scope('thongTinLichChieu').findAll({
            plain: true,
            where: {
              maLichChieu,
            },
          }, {
            transaction: t,
          });
          return thongTinLichChieu;
        });
        return res.status(400).json({ result });
      } catch (e) {
        return res.status(400).json({ msg: e.message });
      }
    }
    return res.status(404).json({ msg: 'Mã lịch chiếu không hợp lệ' });
  };
  return {
    taoLichChieu,
    layThongTinLichChieu,
  };
};
module.exports = LichChieuController;

