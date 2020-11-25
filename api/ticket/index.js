
const express = require('express');
const controller = require('./ticket.controller');

const ticketController = controller();

const authService = require('../../services/auth.service');

const auth = authService();

const router = express.Router();
router.post('/dat-ve', auth.authenticate, auth.authorize(['admin, client']), ticketController.datVe);
module.exports = router;
