const getImage = () => async (req, res) => {
    const {folder, image} = req.params;
    console.log(__filename);
    res.sendFile(`/uploads/${folder}/${image}`);
}

module.exports = {getImage};