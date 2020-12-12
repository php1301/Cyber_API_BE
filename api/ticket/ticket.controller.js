const models = require('../../services/db.service');

// const model = require('./models/Ticket');
// const seatModel = require('../seat/models/Seat');

// const Ticket = model();
// const Seat = seatModel();
const TicketController = () => {
  const datVe = async (req, res) => {
    const db = models().generateModel(false);
    const { maLichChieu, danhSachVe, taiKhoanNguoiDung } = req.body;
    if (maLichChieu && danhSachVe.length > 0 && taiKhoanNguoiDung) {
      try {
        const result = await db.sequelize.transaction(async (t) => {
        // Kiểm tra ghế có thuộc lich chiêu ko
        // Update ghế thành đã đạt
          const gheCuaLichChieu = await db.lichchieu.scope('gheCuaLichChieu').findAll({
            plain: true,
            where: {
              maLichChieu,
            },
          }, {
            transaction: t,
          });
          // eslint-disable-next-line array-callback-return
          const seatsToUpdate = [];
          danhSachVe.map((i) => {
            // duyệt qua các ghế khách đã chọn
          // nếu ghế không thuộc rạp thì throw Error, dừng lại
            const index = gheCuaLichChieu
              .cacLichChieuRap
              .cacChoNgoiTrongRap
              .findIndex((v) => v.maGhe === i.maGhe);
            if (index === -1) {
              throw Error('Ghế không thuộc rạp này');
            }
            // Nếu ghế chưa đặt thì push vào mảng, ở đây ta có thể handle
            // Các logic phức tạp hơn như nếu ghế đã đặt thì throw
            // 2 ghế không kế nhau thì throw,...
            if (
              gheCuaLichChieu
                .cacLichChieuRap
                .cacChoNgoiTrongRap
                .findIndex((v) => v.maGhe === i.maGhe && v.kichHoat === false) !== -1
            // !==-1 vì index 0 là falsy
            ) {
              return seatsToUpdate.push(i.maGhe);
            }
          });
          // Sử dụng class method, truyền argument là mảng các ghế để set trạng thái, transaction
          await db.seat.updateTrangThai(seatsToUpdate, t);
          console.log(danhSachVe);
          const ticket = await db.ticket.create({
            maLichChieu,
            taiKhoanNguoiDung,
          }, {
            transaction: t,
          });
          danhSachVe.map(async (i) => {
            // Truyền mỗi PK thôi cũng được
            await ticket.addDanhSachGhe(i.maGhe);
          });
          // WONTDO: handle giá vé, mã giảm giá, chiết khấu, giá vé có thể nằm trong body luôn
          return ticket;
        }); // Managed transaction, auto rollback if error
        return res.status(200).json({ result });
      } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: e.message });
      }
    }
    return res.status(404).json({ msg: 'Vui lòng điền đầy đủ thông tin' });
  };

  return {
    datVe,
  };
};
module.exports = TicketController;

