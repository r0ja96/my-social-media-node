const { AccountModel, TokenModel } = require('../../models');
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

        const token = await jwt.sign({ _id: emailExist._id }, process.env.REFRESH_TOKEN_SECRET);

        const newToken = new TokenModel({ token });

        await newToken.save()

        res.status(200).json({ status: "Success", message: "Log In", data: { token } });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }
}

const logOut = () => async (req, res) => {
    const { token } = req.body;

    try {
        const tokenExist = await TokenModel.findOne({ token });


        if (tokenExist) {
            await tokenExist.remove();
        }

        res.status(200).json({ status: "Success", message: "Log Out" });

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

module.exports = { create, signIn, lastAccounts, logOut };