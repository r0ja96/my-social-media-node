const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    postID: { type: mongoose.Schema.Types.ObjectId, required: true },
    accountID: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true }
});

const CommentModel = mongoose.model('comments', commentSchema);

module.exports = CommentModel;