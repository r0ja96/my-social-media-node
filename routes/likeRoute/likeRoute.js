const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { likeController } = require('../../controllers');

router.post('/like', auth(), likeController.like());
router.delete('/like', auth(), likeController.unlike());

module.exports = router;