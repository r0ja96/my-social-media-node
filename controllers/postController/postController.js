const { PostModel } = require('../../models');
const fs = require('fs');

const addPost = () => async (req, res) => {

    console.log(req.body)
    console.log(req.files);


}


module.exports = { addPost };