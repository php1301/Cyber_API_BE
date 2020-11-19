const model = require('./models/Nhom');

const Nhom = model();
const NhomController = () => {
  const taoNhom = async (req, res) => {
    const { maNhom, tenNhom } = req.body;
    if (maNhom && tenNhom) {
      try {
        const newNhom = await Nhom.create({
          maNhom,
          tenNhom,
        });
        res.status(200).json({ newNhom });
      } catch (e) {
        console.log(e);
        throw Error(e);
      }
    }
    res.status(400).json({ msg: 'Bad request' });
  };
  return {
    taoNhom,
  };
};

module.exports = NhomController;
