const express = require('express');

const router = express.Router();

router.use('/users', require('../user/index'));

module.exports = router;
