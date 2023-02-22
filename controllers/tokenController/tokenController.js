const jwt = require('jsonwebtoken');

const { TokenModel } = require('../../models');

const generateToken = () => async (req, res) => {

    const { token } = req.body;

    if (token == null) return res.status(400).json({ status: "Failed", message: "Missing token" });

    try {

        const tokenExist = await TokenModel.findOne({ token });

        if (!(tokenExist)) {
            return res.status(400).json({ status: "Failed", message: "Token expired" });
        }

        const decode = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = await jwt.sign({ _id: decode._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })

        res.status(200).json({ status: "Success", message: "Access token generated", data: { accessToken } })
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "Failed", message: "Token expired" });
    }
}

module.exports = { generateToken };