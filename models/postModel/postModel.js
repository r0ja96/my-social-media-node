const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    accountID: { type: mongoose.Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
    image: { type: String },
    postDate: { type: Date, required: true }
});

const PostModel = mongoose.model('posts', postSchema);

module.exports = PostModel;