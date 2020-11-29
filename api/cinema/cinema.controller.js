/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const Sequelize = require('sequelize');
const _ = require('lodash');
const models = require('../../services/db.service');
// const sequelize = db().generateModel(false);

const CinemaController = () => {
  const layThongTinHeThongRap = async (req, res) => {
    const { maHeThongRap } = req.query;
    // https://sequelize.org/v5/manual/querying.html
    try {
      const db = models().generateModel(false);
      const cinemaSystemData = await db.cinemasystem.findAll({
        where: {
          [Sequelize.Op.or]: [{
            maHeThongRap: {
              [Sequelize.Op.substring]: maHeThongRap,
            },
          }],
        },
      });
      return res.status(200).json({ cinemaSystemData });
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  };
  const layThongTinCumRapTheoHeThong = async (req, res) => {
    const { maHeThongRap } = req.query;
    try {
      const db = models().generateModel(false);
      const thongTinCumRapTheoHeThong = await db.cinemasystem.scope('thongTinCumRapTheoHeThong').findAll({
        where: {
          maHeThongRap,
        },
      });
      return res.status(200).json({ thongTinCumRapTheoHeThong });
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  };
  const layThongTinLichChieuHeThongRap = async (req, res) => {
    // Scope heThong -> cumRap -> rap -> lichChieu
    const { maHeThongRap } = req.query;
    const db = models().generateModel(false);
    try {
      const result = await db.sequelize.transaction(async (t) => {
        const thongTinCumRapTheoHeThong = await db.cinemasystem.scope('thongTinCumRapTheoHeThongKhongGomRap').findAll({
          plain: true, // ko de array boc o ngoai
          where: {
            maHeThongRap,
          },
        }, {
          transaction: t,
        });
        const lichChieuTheoHeThongRapData = await db.cinemasystem.scope('lichChieuCacPhimHeThongRap').findAll({
          plain: true,
          where: {
            maHeThongRap,
          },
        }, {
          transaction: t,
        });
        const phim = [];
        // Toàn bộ lịch chiếu hệ thống rạp
        lichChieuTheoHeThongRapData.lichchieu_hethongrap.map((i) => {
          const phimElement = i.lichChieuCuaPhim.dataValues;
          const rapElement = _.pick((i.cacLichChieuRap), ['maRap', 'tenRap']);
          const lichChieu = {
            maLichChieu: i.maLichChieu,
            giaVe: i.giaVe,
            ngayChieu: i.ngayChieu,
            maRap: rapElement.maRap,
            tenRap: rapElement.tenRap,
            maCumRap: i.cacLichChieuCumRap.maCumRap,
          };
          const phimRap = {
            maCumRap: i.cacLichChieuCumRap.maCumRap,
            ...phimElement,
            lichChieu,
          };
          return phim.push(phimRap);
        });
        // Toàn bộ phim hệ thống rạp
        const grouped = _.chain(phim).groupBy('maPhim').map((value, key) => (
          {
            maPhim: key, // key la maPhim
            tenPhim: value.reduce((p, c) => c.tenPhim, 0),
            hinhAnh: value.reduce((p, c) => c.hinhAnh, 0),
            lstLichChieuTheoPhim: value.map((v) => v.lichChieu),
          }
        )).value();
        console.log(grouped);
        // Xóa các lịch chiếu ko đúng cụm rạp
        const lstCumRap = [];
        thongTinCumRapTheoHeThong.lstCumRap.map((i) => {
          const cumRapElement = {
            maCumRap: i.maCumRap,
            tenCumRap: i.tenCumRap,
          };
          const danhSachPhim = [];
          grouped.map((phimElement, indexPhim) => {
            const temp = [...phimElement.lstLichChieuTheoPhim];
            phimElement.lstLichChieuTheoPhim =
            phimElement.lstLichChieuTheoPhim
              .filter((value) => value.maCumRap === i.maCumRap);
            const lstLichChieuTheoPhim = {
              maPhim: phimElement.maPhim,
              tenPhim: phimElement.tenPhim,
              hinhAnh: phimElement.hinhAnh,
              lstLichChieuTheoPhim: grouped[indexPhim].lstLichChieuTheoPhim,
            };
            phimElement.lstLichChieuTheoPhim = temp;
            return danhSachPhim.push(lstLichChieuTheoPhim);
          });
          return lstCumRap.push({ ...cumRapElement, danhSachPhim });
        });
        const data = {
          maHeThongRap: lichChieuTheoHeThongRapData.maHeThongRap,
          tenHeThongRap: lichChieuTheoHeThongRapData.tenHeThongRap,
          biDanh: lichChieuTheoHeThongRapData.biDanh,
          logo: lichChieuTheoHeThongRapData.logo,
          lstCumRap,
          createdAt: lichChieuTheoHeThongRapData.createdAt,
          updatedAt: lichChieuTheoHeThongRapData.updatedAt,
        };
        return data;
      });
      return res.status(200).json({ result });
    } catch (e) {
      return res.status(200).json({ msg: e.message });
    }
  };
  return {
    layThongTinHeThongRap,
    layThongTinCumRapTheoHeThong,
    layThongTinLichChieuHeThongRap,
  };
};
module.exports = CinemaController;

