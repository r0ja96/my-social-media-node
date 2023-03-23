const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: { type: String, required: true }
});

const TokenModel = mongoose.model('tokens', tokenSchema);

module.exports = TokenModel;