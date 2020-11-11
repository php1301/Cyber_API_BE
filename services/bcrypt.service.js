const bcrypt = require('bcrypt');
const { promisify } = require('util');

const genSaltPromise = promisify(bcrypt.genSalt);
const hashPromise = promisify(bcrypt.hash);

const bcryptService = () => {
  const password = (pw) => genSaltPromise(10)
    .then((salt) => hashPromise(pw, salt))
    .then((hash) => hash)
    .catch((e) => { console.log('Bcrypt error ', e); });

  const comparePassword = (pw, hash) => {
    console.log(pw, hash);
    return bcrypt.compare(pw, hash);
  };

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;
