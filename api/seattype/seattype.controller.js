const model = require('../../services/db.service');

const SeatType = model().generateModel().seattype;
const SeatTypeController = () => {
  const createSeatType = async (req, res) => {
    const { tenLoaiGhe, moTa, chietKhau } = req.body;
    if (tenLoaiGhe && chietKhau) {
      try {
        const newSeatType = await SeatType.create({
          tenLoaiGhe,
          moTa,
          chietKhau,
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
