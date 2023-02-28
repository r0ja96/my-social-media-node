const jwt = require('jsonwebtoken');
const { TokenModel } = require('../models');

module.exports = () => async (req, res, next) => {

    const { token } = req.cookies;


    if (!(token)) return res.status(400).json({ status: "Failed", message: "Missing token" });

    const tokenExist = await TokenModel.findOne({ token });

    if (!(tokenExist)) {
        return res.clearCookie('token').status(400).json({ status: "Failed", message: "Token expired" });
    }

    try {
        const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        req._id = decode._id;

        next();
    } catch (error) {
        console.log(error);
        await tokenExist.remove();
        res.clearCookie('token').status(400).json({ status: "Failed", message: "Token expired" });
    }
}