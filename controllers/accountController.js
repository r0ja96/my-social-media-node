const { AccountModel } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const create = () => async (req, res) => {

    const { name, lastName, birthday, email, password } = req.body;

    try {
        const emailExist = await AccountModel.findOne({ email });


        if (emailExist) return res.status(400).json({ status: "Failed", message: "Email already exist" });

        if (!(password)) return res.status(400).json({ status: "Failed", message: "Something went wrong" });

        const hashPassword = await bcrypt.hash(password, 12);

        const newAccount = new AccountModel({ name, lastName, birthday, email, password: hashPassword });

        await newAccount.save()

        res.status(200).json({ status: "Success", message: "Account created" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }
}

const signIn = () => async (req, res) => {

    const { email, password } = req.body;

    try {
        const emailExist = await AccountModel.findOne({ email });


        if (!(emailExist)) return res.status(400).json({ status: "Failed", message: "Email doesn't exist" });

        const isPassword = await bcrypt.compare(password, emailExist.password);


        if (!isPassword) return res.status(400).json({ status: "Failed", message: "Wrong password" })

        const token = await jwt.sign({ _id: emailExist._id }, 'qwert', { expiresIn: '86400s' });

        res.status(200).json({ status: "Success", message: "Log In", data: { id: emailExist._id, name: emailExist.name, lastName: emailExist.lastName, token } });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }
}

const lastAccounts = () => async (req, res) => {

    try {

        const accounts = await AccountModel.find({}, { name: 1, lastName: 1 }).sort({ _id: -1 }).limit(10);

        res.status(200).json({ status: "Success", data: accounts });

    } catch (e) {

        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });

    }
}

module.exports = { create, signIn, lastAccounts };