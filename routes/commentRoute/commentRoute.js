const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { commentController } = require('../../controllers');

router.post('/comment', auth(), commentController.comment());

module.exports = router;