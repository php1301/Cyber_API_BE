/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // database
const glob = require('glob');
const { rolesMap } = require('../api/user/user.enum');
const bcryptService = require('./bcrypt.service');

const dbService = (env) => {
  const seed = async (db) => {
    const hashedPassword = await bcryptService().password(process.env.ADMIN_PASSWORD || '@V3ryStR0N9P@asSWorD');
    try {
      await db.user.create({
        email: process.env.ADMIN_EMAIL || 'admin',
        password: hashedPassword,
        maLoaiNguoiDung: rolesMap.admin, // user role
      });
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        console.log('Admin accound already exist in database.');
      } else {
        console.log(e);
      }
    }
  };
  const generateModel = (sync = true) => {
    const db = {};
    glob.sync('api/**/models/*.js', {
      cwd: process.env.NODE_PATH || '.',
    }).forEach((file) => {
      const model = require(`../${file}`);
      model();
      db[model().name] = model();
    });
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
    db.sequelize = sequelize;
    // db.Sequelize = Sequelize;
    if (sync) {
      db.sequelize.sync({ alter: true });
      seed(db);
    }
    return db;
  };
  const authenticateDB = async () => {
    await sequelize.authenticate();
    generateModel();
  };

  const successfulDBStart = () => (
    console.info('connection to the database has been established successfully')
  );

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  );

  const wrongEnvironment = () => {
    console.warn('use only development, staging, test and production are valid NODE_ENV');
    return process.exit(1);
  };

  const devStart = async () => {
    try {
      await authenticateDB();
      successfulDBStart();
    } catch (e) {
      errorDBStart(e);
    }
  };
  const stagingStart = async () => {
    try {
      await authenticateDB();
      successfulDBStart();
    } catch (e) {
      errorDBStart(e);
    }
  };
  const testStart = async () => {
    try {
      await authenticateDB();
      successfulDBStart();
    } catch (e) {
      errorDBStart(e);
    }
  };
  const prodStart = async () => {
    try {
      await authenticateDB();
      successfulDBStart();
    } catch (e) {
      errorDBStart(e);
    }
  };
  const start = async () => {
    switch (env) {
      case 'development':
        await devStart();
        break;
      case 'staging':
        await stagingStart();
        break;
      case 'test':
        await testStart();
        break;
      case 'production':
        await prodStart();
        break;

      default:
        wrongEnvironment();
        break;
    }
  };

  return { start, generateModel };
};

module.exports = dbService;
