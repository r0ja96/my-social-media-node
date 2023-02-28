const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    friendshipID: { type: Object, required: true, unique: true }
});

const FriendModel = mongoose.model('friendModel', friendSchema);

module.exports = FriendModel;