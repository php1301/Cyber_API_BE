const Sequelize = require('sequelize');
const model = require('./models/Ticket');
const seatModel = require('../seat/models/Seat');

const Ticket = model();
const Seat = seatModel();
const TicketController = () => {
  const datVe = async (req, res) => {
    const { maLichChieu, danhSachVe, taiKhoanNguoiDung } = req.body;
    try {
      Sequelize.Transaction(async (t) => {
        const ticket = await Ticket.create({
          maLichChieu,
          taiKhoanNguoiDung,
          seats: [
            danhSachVe,
          ],
        }, {
          include: [Seat],
          transaction: t,
        });
        return res.status(200).json({ ticket });
      }); // Managed transaction, auto rollback if error
    } catch (e) {
      console.log(e);
      return res.status(400).json({ msg: e });
    }
  };

  return {
    datVe,
  };
};
module.exports = TicketController;

