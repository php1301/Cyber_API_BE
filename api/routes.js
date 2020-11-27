const express = require('express');

const router = express.Router();

router.use('/users', require('./user/index'));
router.use('/seat-type', require('./seattype/index'));
router.use('/phim', require('./phim/index'));
router.use('/nhom', require('./nhom/index'));
router.use('/ticket', require('./ticket/index'));
router.use('/cinema', require('./cinema/index'));

module.exports = router;
