const jwt = require('jsonwebtoken');
const { jwtVerify } = require('../helpers/callback.helper');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });
  const authenticate = (req, res, next) => {
    const token = req.header('token');
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: 'You must provide token',
      });
    }
    return jwtVerify(token, secret)
      .then((decoded) => {
        if (decoded) {
          // console.log(decoded);
          req.user = decoded;
          return next();
        }
        return res.status(200).json({
          message: 'token is valid',
        });
      }).catch((e) => console.log(e));
  };
  const authorize = (userTypeArray) => (req, res, next) => {
    const { maLoaiNguoiDung } = req.user.payload;
    console.log(maLoaiNguoiDung);
    if (userTypeArray.findIndex((elm) => elm === maLoaiNguoiDung) !== -1) { return next(); }
    return res.status(401).json({ message: 'You dont have permission' });
  };
  return {
    issue,
    authenticate,
    authorize,
  };
};

module.exports = authService;
