const jwt = require('jsonwebtoken');

module.exports = () => async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).json({ status: "Failed", message: "Missing token" });

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req._id = decode._id;

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "Failed", message: "Token expired" });
    }
}