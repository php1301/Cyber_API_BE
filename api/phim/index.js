const express = require('express');
const controller = require('./phim.controller');
const authService = require('../../services/auth.service');

const auth = authService();
const phimController = controller();
const router = express.Router();
router.get('/', auth.authenticate, auth.authorize(['admin', 'client']), phimController.layDanhSachPhim);
router.post('/create-phim', auth.authenticate, auth.authorize(['admin']), phimController.themPhim);


module.exports = router;
