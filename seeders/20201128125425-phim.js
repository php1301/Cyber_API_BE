/* eslint-disable no-mixed-operators */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const a = [];
    const randomTenPhim = [
      '13 Reason Why',
      'The Queeen Gambit',
      'Deadpool',
      'Fast and Furious',
      'w@p',
      'La la land',
      'Doc Co Cau Bai',
      'Tam Quoc Chi',
      'Trick Or Treat',
      'Light It Up',
      'The Aquaman without Amber Heard',
      'The Boys',
      'Spider Man: Homecoming',
      'The Batman',
    ];
    const randomTrailer = [
      'https://www.youtube.com/watch?v=9jrxLF_0dKA&t=347s',
      'https://www.youtube.com/watch?v=6avJHaC3C2U',
      'https://www.youtube.com/watch?v=IlU-zDU6aQ0',
      'https://www.youtube.com/watch?v=VSceuiPBpxY',
      'https://www.youtube.com/watch?v=9QiE-M1LrZk',
      'https://www.youtube.com/watch?v=52nqjrCs57s',
      'https://www.youtube.com/watch?v=gnkrDse9QKc',
    ];
    // Random năm, tháng, ngày tới ngày hiện tại
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    for (let i = 0; i < 50; i += 1) {
      // random element bất kì trong mảng
      const tenPhim = randomTenPhim[Math.floor(Math.random() * randomTenPhim.length)];
      const nhom = {
        tenPhim,
        trailer: randomTrailer[Math.floor(Math.random() * randomTrailer.length)],
        hinhAnh: `https://picsum.photos/id/${i}/200/300`, // Random image
        moTa: 'Great Film',
        maNhom: `GP${Math.floor(Math.random() * 10)}`, // Random số nguyên từ 0 -> 9
        ngayKhoiChieu: randomDate(new Date(2020, 1, 1), new Date()),
        // random float 5->0 làm tròn 1 chữ số -> string
        danhGia: (Math.random() * (5 - 0) + 0).toFixed(1), 
        daXoa: false,
        biDanh: tenPhim.toLowerCase().split(' ').join('-'), // split dấu cách và nối bằng -
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      a.push(nhom);
    }
    await Promise.all(a.map(async (i) => {
      await queryInterface.bulkInsert('phim', [
        i,
      ], {});
    }));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('phim', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
