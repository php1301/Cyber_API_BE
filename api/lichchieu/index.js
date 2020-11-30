
const express = require('express');
const controller = require('./lichchieu.controller');

const lichChieuController = controller();

const authService = require('../../services/auth.service');

const auth = authService();

const router = express.Router();
router.post('/tao-lich-chieu', auth.authenticate, auth.authorize(['admin']), lichChieuController.taoLichChieu);
router.get('/lay-thong-tin-lich-chieu', lichChieuController.layThongTinLichChieu);
module.exports = router;
