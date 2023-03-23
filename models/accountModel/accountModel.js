const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const AccountModel = mongoose.model('accounts', accountSchema);

module.exports = AccountModel;