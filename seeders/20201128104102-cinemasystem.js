

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cinemasystem', [
      {
        maHeThongRap: 'BHDStar',
        tenHeThongRap: 'BHD Star Cineplex',
        biDanh: 'bhd-star-cineplex',
        logo: 'http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maHeThongRap: 'CGV',
        tenHeThongRap: 'cgv',
        biDanh: 'bhd-star-cineplex',
        logo: 'http://movie0706.cybersoft.edu.vn/hinhanh/cgv.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maHeThongRap: 'CineStar',
        tenHeThongRap: 'CineStar',
        biDanh: 'cinestar',
        logo: 'http://movie0706.cybersoft.edu.vn/hinhanh/cinestar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maHeThongRap: 'GalaxyCinema',
        tenHeThongRap: 'Galaxy Cinema',
        biDanh: 'galaxy-cinema',
        logo: 'http://movie0706.cybersoft.edu.vn/hinhanh/galaxy-cinema.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maHeThongRap: 'LotteCinema',
        tenHeThongRap: 'LotteCinema',
        biDanh: 'lotte-cinema',
        logo: 'http://movie0706.cybersoft.edu.vn/hinhanh/LotteCinema.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        maHeThongRap: 'MegaGS',
        tenHeThongRap: 'MegaGS',
        biDanh: 'megags',
        logo: 'http://movie0706.cybersoft.edu.vn/hinhanh/megags.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cinemasystem', null, {});
    /**
     *
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
