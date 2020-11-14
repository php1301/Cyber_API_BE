
const express = require('express');
const controller = require('./user.controller');

const userController = controller();
const router = express.Router();
router.post('/register', userController.register);
router.post('/login', userController.login);
// router.post('/', authenticate, authorize(['client', 'admin']), stationController.postStation);


module.exports = router;
