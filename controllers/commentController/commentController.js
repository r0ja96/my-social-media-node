const mongoose = require('mongoose');
const { CommentModel } = require('../../models');


const comment = () => async (req, res) => {

    try {

        const newComment = new CommentModel({
            accountID: mongoose.Types.ObjectId(req._id),
            postID: mongoose.Types.ObjectId(req.body.postID),
            text: req.body.text,
            date: Date.now()
        });

        await newComment.save();
        res.status(200).json({ status: "Success", message: "comment created" });
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }

}

module.exports = { comment };