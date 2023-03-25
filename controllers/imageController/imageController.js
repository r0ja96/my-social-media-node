const path = require('path');
const appDir = path.dirname(require.main.filename);

const getImage = () => async (req, res) => {
    const { folder, image } = req.params;
    const imageDir = `/uploads/${folder}/${image}`;

    res.sendFile(path.join(appDir, imageDir));
}

module.exports = { getImage };