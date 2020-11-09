const database = require('../../config/database');


const dbService = (env) => {
  const authenticateDB = () => database.authenticate();

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
    } catch (e) {
      errorDBStart(e);
    }
  };
  const stagingStart = async () => {
    try {
      await authenticateDB();
    } catch (e) {
      errorDBStart(e);
    }
  };
  const testStart = async () => {
    try {
      await authenticateDB();
    } catch (e) {
      errorDBStart(e);
    }
  };
  const prodStart = async () => {
    try {
      await authenticateDB();
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

  return { start };
};

module.exports = dbService;
