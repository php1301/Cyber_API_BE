const User = require('../models/User');


const UserController = () => {
  const register = async (req, res) => {
    console.log('ok');
    const { body } = req;
    if (body.password === body.password2) {
      try {
        const user = await User.create({
          email: body.email,
          password: body.password,
        });
        return res.status(200).json({ user });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Failed to register' });
      }
    } return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };
  return {
    register,
  };
};

module.exports = UserController;
