const express = require('express');

const router = express.Router();

router.use('/users', require('./user/index'));
router.use('/seat-type', require('./seattype/index'));

module.exports = router;
