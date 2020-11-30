
const { rolesMap } = require('../api/user/user.enum');
const bcryptService = require('../services/bcrypt.service');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPasswordAdmin = await bcryptService().password(process.env.ADMIN_PASSWORD || '@V3ryStR0N9P@asSWorADDMIN');
    const hashedPasswordClient = await bcryptService().password(process.env.CLIENT_MOCK_PASSWORD || '@V3ryStR0N9P@asSWorCLIDENT');
    await queryInterface.bulkInsert('user', [
      {
        email: process.env.ADMIN_EMAIL || 'admin@dn.com',
        password: hashedPasswordAdmin,
        maLoaiNguoiDung: rolesMap.admin, // user role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: process.env.CLIENT_MOCK_EMAIL || 'client@dn.com',
        password: hashedPasswordClient,
        maLoaiNguoiDung: rolesMap.client, // user role
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
