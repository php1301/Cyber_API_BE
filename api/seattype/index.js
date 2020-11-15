const express = require('express');
const controller = require('./seattype.controller');
const authService = require('../../services/auth.service');

const auth = authService();
const seatTypeController = controller();
const router = express.Router();
router.post('/create-seat-type', auth.authenticate, auth.authorize(['admin', 'client']), seatTypeController.createSeatType);


module.exports = router;
