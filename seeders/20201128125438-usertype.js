

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usertype', [
      {
        maLoaiNguoiDung: 'admin',
        tenLoai: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maLoaiNguoiDung: 'client',
        tenLoai: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usertype', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
