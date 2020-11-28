const db = require('../../services/db.service');

// const model = require('./models/Ticket');
// const seatModel = require('../seat/models/Seat');

// const Ticket = model();
// const Seat = seatModel();
const TicketController = () => {
  const datVe = async (req, res) => {
    const sequelize = db().generateModel(false);
    const { maLichChieu, danhSachVe, taiKhoanNguoiDung } = req.body;
    try {
      const result = await sequelize.sequelize.transaction(async (t) => {
        const ticket = await sequelize.ticket.create({
          maLichChieu,
          taiKhoanNguoiDung,
          seat_ticket: [
            danhSachVe,
          ],
        }, {
          include: [{ model: sequelize.seat, as: 'seat_ticket' }],
          transaction: t,
        });
        return ticket;
      }); // Managed transaction, auto rollback if error
      return res.status(200).json({ result });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ msg: e.message });
    }
  };

  return {
    datVe,
  };
};
module.exports = TicketController;

