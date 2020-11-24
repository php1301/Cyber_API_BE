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
      return res.status(200).json({ phimData });
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
      return res.status(200).json({ phimData });
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
      return res.status(200).json({ phimData });
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
        return res.status(200).json({ newPhim });
      } catch (e) {
        console.log(e);
        throw Error(e);
      }
    }
    res.status(400).json({ msg: 'themPhim not succesfully' });
  };
  const themHinhAnhPhimUpload = async (req, res) => {
    console.log(req.file);
    const { maPhim } = req.params;
    // == Phim.update
    // 2 ways https://sequelize.org/v5/manual/instances.html#updating---saving---persisting-an-instance
    const phimToUpload = await Phim.findByPk(maPhim);

    if (phimToUpload) {
      phimToUpload.hinhAnh = req.file.path;
      phimToUpload.save()
        .then((r) => res.stautus(200).json(r))
        .catch((e) => { console.log(e); return res.status(400).json({ msg: e }); });
    }
    return res.status(400).json({ msg: 'Phim not exists' });
  };
  const layThongTinPhim = async (req, res) => {
    const { maPhim } = req.query;
    const thongTinPhim = await Phim.findByPk(maPhim);
    if (!thongTinPhim) return res.status(400).json({ msg: 'Phim not exists' });
    return res.status(200).json({ thongTinPhim });
  };
  const xoaPhim = async (req, res) => {
    const { maPhim } = req.params;
    const affected = await Phim.destroy({
      where: {
        maPhim,
      },
    });
    if (affected === 0) {
      return res.status(400).json({ msg: 'No Phim with this id found' });
    }
    return res.status(200).json({ msg: 'Phim deleted' });
  };
  return {
    layDanhSachPhim,
    themPhim,
    themHinhAnhPhimUpload,
    layThongTinPhim,
    xoaPhim,
    layDanhSachPhimPhanTrang,
    layDanhSachPhimTheoNgay,
  };
};
module.exports = PhimController;
