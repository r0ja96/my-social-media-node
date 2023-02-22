const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { tokenController } = require('../../controllers');

router.post('/token', tokenController.generateToken());

module.exports = router;