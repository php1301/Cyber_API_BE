const express = require('express');
const controller = require('./nhom.controller');
const authService = require('../../services/auth.service');

const auth = authService();
const nhomController = controller();
const router = express.Router();
router.post('/create-nhom', auth.authenticate, auth.authorize(['client', 'admin']), nhomController.taoNhom);

module.exports = router;
