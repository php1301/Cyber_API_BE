const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports.jwtVerify = promisify(jwt.verify);
module.exports.jwtSign = promisify(jwt.sign);
