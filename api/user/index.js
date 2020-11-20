
const express = require('express');
const controller = require('./user.controller');

const userController = controller();

const authService = require('../../services/auth.service');

const auth = authService();

const router = express.Router();
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/admin/user-list', auth.authenticate, auth.authorize(['admin']), userController.layDanhSachNguoiDung);
router.get('/admin/user-list-pagination', auth.authenticate, auth.authorize(['admin']), userController.layDanhSachNguoiDungPhanTrang);
router.get('/user-info', auth.authenticate, auth.authorize(['admin', 'client']), userController.layThongTinTaiKhoan);
router.delete('/admin/delete-user', auth.authenticate, auth.authorize(['admin']), userController.xoaNguoiDung);

module.exports = router;
