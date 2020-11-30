

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('seattype', [
      {
        maLoaiGhe: 'thuong',
        tenLoaiGhe: 'Ghe Thuong',
        moTa: 'Ghế thường, không có khuyến mãi',
        chietKhau: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maLoaiGhe: 'vip',
        tenLoaiGhe: 'Ghe VIP',
        moTa: 'Ghế VIP, có khuyến mãi',
        chietKhau: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('seattype', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
