

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const arr = [...Array(7)];
    const maLoaiGheArr = ['thuong', 'vip'];
    arr.map((value, index) => {
      // inti stt mỗi rạp
      let stt = 0;
      const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
      alphabet.map((alpha) => {
        // Có thể random seat số lượng ghế mỗi hàng từ 10 ~ 12
        // const arrSeats = [...Array(Math.floor(Math.random() * 15) + 1)]; // random từ 1 đến 15
        const arrSeats = [...Array(Math.floor(Math.random() * 15) + 10)];
        return arrSeats.map(async (seat, seatIndex) => {
          stt += 1;
          try {
            await queryInterface.bulkInsert('seat', [
              {
              // seed 7 rạp 0->6 => +1
                maRap: index + 1,
                // Tên ghế là chữ + số ghế hàng đó
                tenGhe: `${alpha}${seatIndex + 1}`,
                stt: stt,
                // Random maLoaiGhe
                maLoaiGhe: maLoaiGheArr[Math.floor(Math.random() * maLoaiGheArr.length)],
                kichHoat: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ], {});
          } catch (e) {
            console.log(e);
          }
        });
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('seat', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
