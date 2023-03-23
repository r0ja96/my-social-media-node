const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    friendshipID: {
        type: Object,
        accountID: { type: mongoose.Schema.Types.ObjectId, required: true },
        friendID: { type: mongoose.Schema.Types.ObjectId, required: true },
        required: true,
        unique: true
    }
});

const FriendModel = mongoose.model('friends', friendSchema);

module.exports = FriendModel;