
const express = require('express');
const controller = require('./cinema.controller');

const cinemaController = controller();

const authService = require('../../services/auth.service');

const auth = authService();

const router = express.Router();
router.get('/lay-thong-tin-he-thong-rap', cinemaController.layThongTinHeThongRap);
router.get('/lay-thong-tin-cum-rap-theo-he-thong', cinemaController.layThongTinCumRapTheoHeThong);
router.get('/lay-thong-tin-lich-chieu-he-thong-rap', cinemaController.layThongTinLichChieuHeThongRap);
module.exports = router;
