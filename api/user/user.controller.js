/* eslint-disable import/no-extraneous-dependencies */
const Sequelize = require('sequelize');
const authService = require('../../services/auth.service');
const bcryptService = require('../../services/bcrypt.service');
const _ = require('lodash');
// const model = require('../../services/db.service');

const model = require('./models/User');

const User = model();
const UserController = () => {
  const register = async (req, res) => {
    const { email, password, password2 } = req.body;
    if (password === password2) {
      try {
        const hashedPassword = await bcryptService().password(password);
        // create = build + save
        // https://sequelize.org/master/manual/model-instances.html
        // update vài field thì cần save lại
        const user = await User.create({
          email,
          password: hashedPassword,
          maLoaiNguoiDung: 'client',
        });
        const payload = _.pick(user, ['taiKhoan', 'email', 'maLoaiNguoiDung']);
        const token = authService().issue({ payload });
        return res.status(200).json({ token });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Failed to register' });
      }
    } return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await User.findOne({
          where: {
            email,
          },
        });
        if (!user) res.status(400).json({ msg: 'Email or password is wrong' });
        // Các service của brcypt
        const isMatched = await bcryptService().comparePassword(password, user.password);
        if (isMatched) {
          // Các service của auth cho việc auth, tạo token,...
          const payload = _.pick(user, ['taiKhoan', 'email', 'maLoaiNguoiDung']);
          const token = authService().issue({ payload });
          return res.status(200).json({ token });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const layDanhSachNguoiDung = async (req, res) => {
    const { keyword } = req.query;
    const userData = await User.findAll({
      where: {
        [Sequelize.Op.or]: {
          email: {
            [Sequelize.Op.contains]: keyword,
          },
          maNhom: {
            [Sequelize.Op.contains]: keyword,
          },
          maLoaiNguoiDung: {
            [Sequelize.Op.contains]: keyword,
          },
          soDT: {
            [Sequelize.Op.contains]: keyword,
          },
          hoTen: {
            [Sequelize.Op.contains]: keyword,
          },
        },
      },
    });
    return res.status(200).json({ userData });
  };

  const layDanhSachNguoiDungPhanTrang = async (req, res) => {
    const { page, pageSize, keyword } = req.query;
    const pageNum = parseInt(page || 0, 10);
    const pageSizeNum = parseInt(pageSize || 10, 10);
    const offset = pageNum * pageSizeNum;
    const limit = pageSizeNum;
    const userData = await User.findAndCountAll({
      limit,
      offset,
      where: {
        [Sequelize.Op.or]: {
          email: {
            [Sequelize.Op.contains]: keyword,
          },
          maNhom: {
            [Sequelize.Op.contains]: keyword,
          },
          maLoaiNguoiDung: {
            [Sequelize.Op.contains]: keyword,
          },
          soDT: {
            [Sequelize.Op.contains]: keyword,
          },
          hoTen: {
            [Sequelize.Op.contains]: keyword,
          },
        },
      },
    });
    return res.status(200).json({ userData });
  };
  const layThongTinTaiKhoan = async (req, res) => {
    const { taiKhoan } = req.params;
    const thongTinTaiKhoan = await User.findByPk(taiKhoan);
    if (!thongTinTaiKhoan) { return res.status(400).json({ msg: 'User not found' }); }
    return res.status(200).json({ thongTinTaiKhoan });
  };
  const capNhatThongTinNguoiDung = async (req, res) => {
    const {
      taiKhoan, matKhau, email, soDT, maNhom, maLoaiNguoiDung, hoTen,
    } = req.query;
    // PATCH
    // const found = User.findByPk(taiKhoan);
    // (await found).set(body)
    // .save
    // PUT
    const updatedUser = await User.update({
      matKhau,
      email,
      soDT,
      maNhom,
      maLoaiNguoiDung,
      hoTen,
    }, {
      where: {
        taiKhoan,
      },
    });
    if (updatedUser) return res.status(200).json({ updatedUser });
    return res.status(400).json({ msg: 'Updated not succesfully' });
  };
  const xoaNguoiDung = async (req, res) => {
    const { taiKhoan } = req.params;
    const affected = await User.destroy({
      where: {
        taiKhoan,
      },
    });
    if (affected === 0) {
      return res.status(400).json({ msg: 'No User with this id found' });
    }
    return res.status(200).json({ msg: 'User deleted' });
  };

  return {
    register,
    login,
    layDanhSachNguoiDung,
    layDanhSachNguoiDungPhanTrang,
    layThongTinTaiKhoan,
    capNhatThongTinNguoiDung,
    xoaNguoiDung,
  };
};

module.exports = UserController;
