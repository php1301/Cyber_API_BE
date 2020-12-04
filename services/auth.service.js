const jwt = require('jsonwebtoken');
const { jwtVerify } = require('../helpers/callback.helper');
// Config của jwt
const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const authService = () => {
  // Tạo token, với payload muốn lưu trong token
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: '7d' });
  const authenticate = (req, res, next) => {
    const token = req.header('token');
    // console.log(token);
    // Nếu không có token thì throw message error
    if (!token) {
      return res.status(401).json({
        message: 'You must provide token',
      });
    }
    // decode và gửi payload này cho middleware tiếp theo
    return jwtVerify(token, secret)
      .then((decoded) => {
        if (decoded) {
          // console.log(decoded);
          req.user = decoded;
          // next chạy middleware tiếp theo
          return next();
        }
        return res.status(200).json({
          message: 'token is valid',
        });
      }).catch((e) => console.log(e));
  };
  const authorize = (userTypeArray) => (req, res, next) => {
    const { maLoaiNguoiDung } = req.user.payload;
    // console.log(maLoaiNguoiDung);
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
