const mongoose = require('mongoose');
const { PostModel, FriendModel } = require('../../models');


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

const getFriendsPost = () => async (req, res) => {

    const { _id } = req;

    try {
        let friendship = await FriendModel.find({ 'friendshipID.accountID': mongoose.Types.ObjectId(_id) }, { 'friendshipID.accountID': 0, _id: 0, __v: 0 });

        friendship = friendship.map(({ friendshipID }) => friendshipID.friendID ? friendshipID.friendID : null);

        friendship.push(mongoose.Types.ObjectId(_id));

        //const post = await PostModel.find({ accountID: { $in: friendship } }).sort({ postDate: -1 });

        const posts = await PostModel.aggregate([
            {
                $match:{
                    accountID:{ $in: friendship }
                }
            },
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
                    "account.__v":0,
                    "accountID":0,
                    "__v":0
                }
            }
        ]).sort({ postDate: -1 });

        res.status(200).json({ data: posts, status: "Success", message: "Post created" });

    } catch (e) {
        console.log(e)
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }
}

module.exports = { addPost, getFriendsPost };