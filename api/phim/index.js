const express = require('express');
const controller = require('./phim.controller');

const phimController = controller();
const authService = require('../../services/auth.service');

const auth = authService();
const router = express.Router();
router.get('/phim', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layDanhSachPhim);
router.get('/phim-paginate', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layDanhSachPhimPhanTrang);
router.get('/phim-theo-ngay', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layDanhSachPhimTheoNgay);
router.get('/lay-thong-tin-phim', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layThongTinPhim);
router.post('/create-phim', auth.authenticate, auth.authorize(['admin']), phimController.themPhim);
router.delete('/delete-phim', auth.authenticate, auth.authorize(['admin']), phimController.xoaPhim);

module.exports = router;
