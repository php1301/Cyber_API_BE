const Sequelize = require('sequelize');
const model = require('./models/LichChieu');
const models = require('../../services/db.service');

const LichChieu = model();
const LichChieuController = () => {
  const taoLichChieu = async (req, res) => {
    const db = models().generateModel(false);
    const {
      maPhim, ngayChieu, maRap, giaVe,
    } = req.body;
    try {
      const result = await db.sequelize.transaction(async (t) => {
        const lichChieu = await db.lichchieu.create({
          maPhim,
          ngayChieu: new Date(ngayChieu),
          maRap,
          giaVe,
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
  return {
    taoLichChieu,
  };
};
module.exports = LichChieuController;

