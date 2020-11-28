

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const a = [];
    const random = ['Action', 'Horror', 'Thrilling', 'Hype', 'Romance'];
    for (let i = 0; i < 10; i += 1) {
      const nhom = {
        maNhom: `GP${i}`,
        tenNhom: random[Math.floor(Math.random() * random.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      a.push(nhom);
    }
    await Promise.all(a.map(async (i) => {
      console.log('ok');
      await queryInterface.bulkInsert('nhom', [
        i,
      ], {});
    }));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('nhom', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
