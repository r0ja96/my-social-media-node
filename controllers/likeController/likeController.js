const mongoose = require('mongoose');
const { LikeModel } = require('../../models');


const like = () => async (req, res) => {

    try {

        const likeID = {
            postID: mongoose.Types.ObjectId(req.body.postID),
            accountID: mongoose.Types.ObjectId(req._id)
        }

        const like = await LikeModel.findOne({ likeID });

        if (like) return res.status(400).json({ status: "Failed", message: "Like already exist" });

        const newLike = new LikeModel({ likeID });

        await newLike.save();

        res.status(200).json({ status: "Success", message: "Like added" });
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }

}

module.exports = { like };