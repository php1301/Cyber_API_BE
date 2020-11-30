const express = require('express');
const controller = require('./phim.controller');

const phimController = controller();
const authService = require('../../services/auth.service');
const { uploadImage } = require('../../common/upload-image');

const auth = authService();
const router = express.Router();
router.get('/phim-list', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layDanhSachPhim);
router.get('/phim-paginate', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layDanhSachPhimPhanTrang);
router.get('/phim-theo-ngay', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layDanhSachPhimTheoNgay);
router.get('/lay-thong-tin-phim', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layThongTinPhim);
router.get('/lay-lich-chieu-phim', phimController.layThongTinLichChieuPhim);
router.post('/tao-phim', auth.authenticate, auth.authorize(['admin']), phimController.themPhim);
router.post('/upload-hinh-anh-phim/:maPhim', auth.authenticate, auth.authorize(['admin']), uploadImage('phim'), phimController.themHinhAnhPhimUpload);
router.delete('/:maPhim', auth.authenticate, auth.authorize(['admin']), phimController.xoaPhim);

module.exports = router;
