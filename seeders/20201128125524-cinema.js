

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cinema', [
      {
        tenRap: 'Rap 1',
        soGhe: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        maCumRap: 'megags-cao-thang',
      },
      {
        tenRap: 'Rap 2',
        soGhe: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        maCumRap: 'megags-cao-thang',
      },
      {
        tenRap: 'Rap 3',
        soGhe: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        maCumRap: 'cgv-ndc',
      },
      {
        tenRap: 'Rap 4',
        soGhe: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        maCumRap: 'cgv-3/2',
      },
      {
        tenRap: 'Rap 5',
        soGhe: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        maCumRap: 'bhd-hvt',
      },
      {
        tenRap: 'Rap 6',
        soGhe: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        maCumRap: 'bhd-hvt',
      },
      {
        tenRap: 'Rap 7',
        soGhe: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        maCumRap: 'bhd-kdv',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cinema', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
