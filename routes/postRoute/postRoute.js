const express = require('express');
const auth = require('../../middleware/auth');
const uploads = require('../../middleware/uploads');

const { postController } = require('../../controllers');

const router = express.Router();


router.post('/post', auth(), uploads, postController.addPost());
router.get('/post/:postID', auth(), postController.getPost())
router.get('/posts/friends', auth(), postController.getFriendsPost());

module.exports = router;