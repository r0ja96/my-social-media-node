const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { commentController } = require('../../controllers');

router.post('/comment', auth(), commentController.comment());
router.delete('/comment', auth(), commentController.deleteComment());
router.put('/comment', auth(), commentController.editComment());

module.exports = router;