const jwt = require('jsonwebtoken');

module.exports = () => async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).json({ status: "Failed", message: "Missing token" });
    //console.log('entro', token);
    try {
        const decode = jwt.verify(token, 'qwert');

        console.log(decode._id);
        req._id = decode._id;
        console.log(req._id);

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "Failed", message: "Token expired" });
    }


}