const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    likeID: {
        type: Object,
        postID: { type: mongoose.Schema.Types.ObjectId, required: true },
        accountID: { type: mongoose.Schema.Types.ObjectId, required: true },
        required: true,
        unique: true
    }
});

const LikeModel = mongoose.model('likes', likeSchema);

module.exports = LikeModel;