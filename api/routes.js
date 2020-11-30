const express = require('express');

const router = express.Router();

router.use('/users', require('./user/index'));
router.use('/phim', require('./phim/index'));
router.use('/nhom', require('./nhom/index'));
router.use('/ticket', require('./ticket/index'));
router.use('/cinema', require('./cinema/index'));
router.use('/lichchieu', require('./lichchieu/index'));

module.exports = router;
