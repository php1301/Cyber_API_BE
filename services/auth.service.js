const jwt = require('jsonwebtoken');
const { jwtVerify } = require('../helpers/callback.helper');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });
  const authenticate = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
      return res.status(401).json({
        message: 'You must provide token',
      });
    }
    return jwtVerify(token, process.env.secretKey || 'mysecrettt')
      .then((decoded) => {
        if (decoded) {
          console.log(decoded);
          req.user = decoded;
          return next();
        }
        return res.status(200).json({
          message: 'token is valid',
        });
      });
  };
  const authorize = (userTypeArray) => (req, res, next) => {
    console.log(req.user);
    const { userType } = req.user;
    if (userTypeArray.findIndex((elm) => elm === userType) !== -1) { return next(); }
    return res.status(401).json({ message: 'You dont have permission' });
  };
  return {
    issue,
    authenticate,
    authorize,
  };
};

module.exports = authService;
