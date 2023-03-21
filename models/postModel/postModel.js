const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    accountID: { type: String, required: true },
    image: { type: String },
    postDate: { type: Date, required: true }
});

const PostModel = mongoose.model('postModel', postSchema);

module.exports = PostModel;