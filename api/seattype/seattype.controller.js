const model = require('./models/SeatType');

const SeatType = model();
const SeatTypeController = () => {
  const createSeatType = async (req, res) => {
    const { tenLoaiGhe, moTa, chietKhau } = req.body;
    if (tenLoaiGhe && chietKhau) {
      try {
        const newSeatType = await SeatType.create({
          tenLoaiGhe,
          moTa,
        });
        return res.status(200).json({ newSeatType });
      } catch (e) {
        return res.status(500).json({ msg: 'Failed to create SeatType' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request' });
  };
  return { createSeatType };
};

module.exports = SeatTypeController;
