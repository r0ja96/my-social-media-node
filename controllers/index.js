const accountController = require('./accountController/accountController');
const tokenController = require('./tokenController/tokenController');
const friendController = require('./friendController/friendController');
const postController = require('./postController/postController');
const imageController = require('./imageController/imageController');
const likeController = require('./likeController/likeController');
const commentController = require('./commentController/commentController');

module.exports = {
    accountController,
    tokenController,
    friendController,
    postController,
    imageController,
    likeController,
    commentController
}