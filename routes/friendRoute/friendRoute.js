const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { friendController } = require('../../controllers');

router.post('/friend', auth(), friendController.addFriend());
router.get('/friends', auth(), friendController.friends());

module.exports = router;