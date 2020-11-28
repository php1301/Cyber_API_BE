
const express = require('express');
const controller = require('./cinema.controller');

const cinemaController = controller();

const authService = require('../../services/auth.service');

const auth = authService();

const router = express.Router();
router.post('/lay-thong-tin-he-thong-rap', auth.authenticate, auth.authorize(['admin', 'client']), cinemaController.layThongTinHeThongRap);
module.exports = router;
