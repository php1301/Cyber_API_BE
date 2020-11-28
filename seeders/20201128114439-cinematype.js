

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cinematype', [
      {
        maCumRap: 'megags-cao-thang',
        tenCumRap: 'MegaGS - Cao Thắng',
        thongTin: 'blabla',
        maHeThongRap: 'MegaGS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maCumRap: 'megags-ntp',
        tenCumRap: 'MegaGS - NTP',
        thongTin: 'blabla',
        maHeThongRap: 'MegaGS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maCumRap: 'bhd-kdv',
        tenCumRap: 'BHD Kinh Duong Vuong',
        thongTin: 'blabla',
        maHeThongRap: 'BHDStar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maCumRap: 'bhd-hvt',
        tenCumRap: 'BHD Hoang Van Thu',
        thongTin: 'blabla',
        maHeThongRap: 'BHDStar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maCumRap: 'cgv-ndc',
        tenCumRap: 'CGV Nguyen Dinh Chieu',
        thongTin: 'blabla',
        maHeThongRap: 'CGV',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maCumRap: 'cgv-3/2',
        tenCumRap: 'CGV 3 thang 2',
        thongTin: 'blabla',
        maHeThongRap: 'CGV',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cinematype', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
