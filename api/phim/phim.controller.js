const model = require('./models/Phim');

const Phim = model();
const PhimController = () => {
  const layDanhSachPhim = async (req, res) => {
    const { maNhom, tenPhim } = req.query;
    try {
      const phimData = await Phim.findAll({
        where: {
          maNhom,
          tenPhim,
        },
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
  return {
    layDanhSachPhim,
    themPhim,
  };
};
module.exports = PhimController;
