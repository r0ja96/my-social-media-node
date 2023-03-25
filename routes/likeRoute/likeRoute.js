const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { likeController } = require('../../controllers');

router.post('/like', auth(), likeController.like());

module.exports = router;