const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { friendController } = require('../../controllers');

router.post('/friend', auth(), friendController.addFriend());

module.exports = router;