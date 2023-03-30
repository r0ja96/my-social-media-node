const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const { PostModel, FriendModel, LikeModel, CommentModel } = require('../../models');


const addPost = () => async (req, res) => {

    try {

        const newPost = new PostModel({
            accountID: mongoose.Types.ObjectId(req._id),
            text: req.body.text,
            image: (req.file ? req.file.name : null),
            postDate: Date.now()
        });

        await newPost.save();
        res.status(200).json({ status: "Success", message: "Post created" });
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }

}

const editPost = () => async (req, res) => {

    try {

        /*console.log({
            accountID: mongoose.Types.ObjectId(req._id),
            text: req.body.text,
            image: (req.file ? req.file.name : null),
            postDate: Date.now()
        });*/

        const postExist = await PostModel.findOne({ _id: mongoose.Types.ObjectId(req.body.postID), accountID: mongoose.Types.ObjectId(req._id) });

        if (!(postExist)) return res.status(400).json({ status: "Failed", message: "Post doesnt exist" });

        //console.log(postExist);

        if (postExist.image) {
            const fullImagePath = path.join(appDir, `/uploads/${req._id}/${postExist.image}`);

            if (fs.existsSync(fullImagePath))
                fs.unlink(fullImagePath, function (err) {
                    if (err) throw err;
                });
        }

        const editedPost = await PostModel.updateOne(postExist, { text: req.body.text, image: (req.file ? req.file.name : null) });

        console.log(editedPost);

        /*const newPost = new PostModel({
            accountID: mongoose.Types.ObjectId(req._id),
            text: req.body.text,
            image: (req.file ? req.file.name : null),
            postDate: Date.now()
        });

        await newPost.save();*/
        res.status(200).json({ status: "Success", message: "Post edited" });
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }

}

const getFriendsPost = () => async (req, res) => {

    const { _id } = req;

    try {
        let friendship = await FriendModel.find({ 'friendshipID.accountID': mongoose.Types.ObjectId(_id) }, { 'friendshipID.accountID': 0, _id: 0, __v: 0 });

        friendship = friendship.map(({ friendshipID }) => friendshipID.friendID ? friendshipID.friendID : null);

        friendship.push(mongoose.Types.ObjectId(_id));

        //const post = await PostModel.find({ accountID: { $in: friendship } }).sort({ postDate: -1 });

        let posts = await PostModel.aggregate([
            {
                $match: {
                    accountID: { $in: friendship }
                }
            }, {
                $lookup: {
                    from: "accounts",
                    localField: "accountID",
                    foreignField: "_id",
                    as: "account"
                }
            }, {
                $unwind: "$account"
            }, {
                $project: {
                    "account.birthday": 0,
                    "account.email": 0,
                    "account.password": 0,
                    "account.__v": 0,
                    "accountID": 0,
                    "__v": 0
                }
            }, {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "likeID.postID",
                    as: "like"
                }
            }, {
                $project: {
                    "like._id": 0,
                    "like.__v": 0
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postID",
                    pipeline: [
                        {
                            $lookup: {
                                from: "accounts",
                                localField: "accountID",
                                foreignField: "_id",
                                as: "account"
                            }
                        }, {
                            $unwind: "$account"
                        },
                        {
                            $project: {
                                "account.birthday": 0,
                                "account.email": 0,
                                "account.password": 0,
                                "account.__v": 0,
                            }
                        }
                    ],
                    as: "comments"
                }
            }, {
                $project: {
                    "comments.accountID": 0,
                    "comments.postID": 0,
                    "comments.__v": 0
                }
            }
        ]).sort({ postDate: -1 });

        posts.map((data) => {

            data.account.isAccountPost = (String(data.account._id) === _id);

            data.comments = data.comments.map((comment) => {
                comment.account.isAccountComment = (String(comment.account._id) === _id);
                return comment
            });

            const like = {
                likes: data.like.length,
                like: false
            }

            for (const d of data.like) {
                if (String(d.likeID.accountID) === _id) {
                    like.like = true;
                    break;
                }
            }

            data.like = like;

            return data;
        });

        res.status(200).json({ data: posts, status: "Success", message: "Post found" });

    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }
}

const getPost = () => async (req, res) => {

    const { _id } = req;

    const { postID } = req.params;


    try {

        let posts = await PostModel.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(postID)
                }
            }, {
                $lookup: {
                    from: "accounts",
                    localField: "accountID",
                    foreignField: "_id",
                    as: "account"
                }
            }, {
                $unwind: "$account"
            }, {
                $project: {
                    "account.birthday": 0,
                    "account.email": 0,
                    "account.password": 0,
                    "account.__v": 0,
                    "accountID": 0,
                    "__v": 0
                }
            }, {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "likeID.postID",
                    as: "like"
                }
            }, {
                $project: {
                    "like._id": 0,
                    "like.__v": 0
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postID",
                    pipeline: [
                        {
                            $lookup: {
                                from: "accounts",
                                localField: "accountID",
                                foreignField: "_id",
                                as: "account"
                            }
                        }, {
                            $unwind: "$account"
                        },
                        {
                            $project: {
                                "account.birthday": 0,
                                "account.email": 0,
                                "account.password": 0,
                                "account.__v": 0,
                            }
                        }
                    ],
                    as: "comments"
                }
            }, {
                $project: {
                    "comments.accountID": 0,
                    "comments.postID": 0,
                    "comments.__v": 0
                }
            }
        ]);

        posts.map((data) => {

            data.account.isAccountPost = (String(data.account._id) === _id);

            data.comments = data.comments.map((comment) => {
                comment.account.isAccountComment = (String(comment.account._id) === _id);
                return comment
            });

            const like = {
                likes: data.like.length,
                like: false
            }

            for (const d of data.like) {
                if (String(d.likeID.accountID) === _id) {
                    like.like = true;
                    break;
                }
            }

            data.like = like;

            return data;
        });

        res.status(200).json({ data: posts, status: "Success", message: "Post found" });

    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }

}

const deletePost = () => async (req, res) => {

    const postID = mongoose.Types.ObjectId(req.body.postID);
    const accountID = mongoose.Types.ObjectId(req._id);

    try {

        const postExist = await PostModel.findOne({ _id: postID, accountID });

        if (!(postExist)) return res.status(400).json({ status: "Failed", message: "Post doesnt exist" });

        await LikeModel.deleteMany({ 'likeID.postID': postID });
        await CommentModel.deleteMany({ postID });
        await PostModel.deleteOne(postExist);

        if (postExist.image) {
            const fullImagePath = path.join(appDir, `/uploads/${req._id}/${postExist.image}`);

            if (fs.existsSync(fullImagePath))
                fs.unlink(fullImagePath, function (err) {
                    if (err) throw err;
                });
        }

        res.status(200).json({ status: "Success", message: "Post delete" });
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }
}

module.exports = { addPost, getFriendsPost, getPost, deletePost, editPost };