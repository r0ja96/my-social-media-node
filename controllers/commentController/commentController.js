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
        res.status(200).json({ status: "Success", message: "Comment created" });
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }

}

const deleteComment = () => async (req, res) => {

    try {

        const commentExist = await CommentModel.findOne({ _id: mongoose.Types.ObjectId(req.body.commentID), accountID: mongoose.Types.ObjectId(req._id) });

        if (!(commentExist)) res.status(400).json({ status: "Failed", message: "Comment doesnt exist" });

        await CommentModel.deleteOne(commentExist);

        res.status(200).json({ status: "Success", message: "Comment deleted" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }
}

const editComment = () => async (req, res) => {
    try {

        const commentExist = await CommentModel.findOne({ _id: mongoose.Types.ObjectId(req.body.commentID), accountID: mongoose.Types.ObjectId(req._id) });

        if (!(commentExist)) res.status(400).json({ status: "Failed", message: "Comment doesnt exist" });

        await CommentModel.updateOne(commentExist, { text: req.body.text });

        res.status(200).json({ status: "Success", message: "Comment updated" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }
}

module.exports = { comment, deleteComment, editComment };