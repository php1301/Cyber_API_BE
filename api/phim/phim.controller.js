const Sequelize = require('sequelize');
const model = require('./models/Phim');

const Phim = model();
const PhimController = () => {
  const layDanhSachPhim = async (req, res) => {
    const { maNhom, tenPhim } = req.query;
    try {
      const phimData = await Phim.findAll({
        where: {
          maNhom,
          [Sequelize.Op.or]: {
            tenPhim: {
              [Sequelize.Op.contains]: tenPhim,
            },
          },
        },
      });
      res.status(200).json({ phimData });
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };
  const layDanhSachPhimPhanTrang = async (req, res) => {
    const {
      page, pageSize, tenPhim, maNhom,
    } = req.query;
    const pageNum = parseInt(page || 0, 10);
    const pageSizeNum = parseInt(pageSize || 10, 10);
    const offset = pageNum * pageSizeNum;
    const limit = pageSizeNum; try {
      const phimData = await Phim.findAll({
        where: {
          maNhom,
          [Sequelize.Op.or]: {
            tenPhim: {
              [Sequelize.Op.contains]: tenPhim,
            },
          },
        },
        offset,
        limit,
      });
      res.status(200).json({ phimData });
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };
  const layDanhSachPhimTheoNgay = async (req, res) => {
    const {
      page, pageSize, tenPhim, maNhom, startDate, endDate,
    } = req.query;
    const pageNum = parseInt(page || 0, 10);
    const pageSizeNum = parseInt(pageSize || 10, 10);
    const offset = pageNum * pageSizeNum;
    const limit = pageSizeNum; try {
      const phimData = await Phim.findAll({
        where: {
          maNhom,
          [Sequelize.Op.or]: {
            tenPhim: {
              [Sequelize.Op.contains]: tenPhim,
            },
            ngayKhoiChieu: {
              [Sequelize.Op.between]: [startDate, endDate],
            },
          },
        },
        offset,
        limit,
      });
      res.status(200).json({ phimData });
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };
  const themPhim = async (req, res) => {
    const {
      tenPhim, trailer, hinhAnh, maNhom, moTa, ngayKhoiChieu, danhGia, biDanh,
    } = req.body;
    if (tenPhim && maNhom) {
      try {
        const newPhim = await Phim.create({
          tenPhim,
          trailer,
          hinhAnh,
          maNhom,
          moTa,
          ngayKhoiChieu,
          danhGia,
          biDanh,
        });
        res.status(200).json({ newPhim });
      } catch (e) {
        console.log(e);
        throw Error(e);
      }
    }
    res.status(400).json({ msg: 'themPhim not succesfully' });
  };
  const layThongTinPhim = async (req, res) => {
    const { maPhim } = req.query;
    const thongTinPhim = await Phim.findByPk(maPhim);
    if (!thongTinPhim) res.status(400).json({ msg: 'Phim not exists' });
    res.status(200).json({ thongTinPhim });
  };
  const xoaPhim = async (req, res) => {
    const { maPhim } = req.body;
    const affected = await Phim.destroy({
      where: {
        maPhim,
      },
    });
    if (affected === 0) {
      res.status(400).json({ msg: 'No Phim with this id found' });
    }
    res.status(200).json({ msg: 'Phim deleted' });
  };
  return {
    layDanhSachPhim,
    themPhim,
    layThongTinPhim,
    xoaPhim,
    layDanhSachPhimPhanTrang,
    layDanhSachPhimTheoNgay,
  };
};
module.exports = PhimController;
