// Do chi co postgre ko có type enum nên phải convert

module.exports.rolesMap = {
  admin: 'admin',
  editor: 'editor',
  client: 'client',
};

module.exports.rolesEnum = ['admin', 'editor', 'client'];
