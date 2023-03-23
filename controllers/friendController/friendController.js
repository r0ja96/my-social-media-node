const { AccountModel, FriendModel } = require('../../models');
const mongoose = require('mongoose');

const addFriend = () => async (req, res) => {

    const { friendID } = req.body;
    const { _id } = req;

    const friendshipID = { accountID: mongoose.Types.ObjectId(_id), friendID: mongoose.Types.ObjectId(friendID) }
    const friendshipID2 = { accountID: mongoose.Types.ObjectId(friendID), friendID: mongoose.Types.ObjectId(_id) }
    try {
        const friendshipExist = await FriendModel.findOne({ friendshipID });
        const friendshipExist2 = await FriendModel.findOne({ friendshipID: friendshipID2 });

        if (friendshipExist && friendshipExist2) return res.status(400).json({ status: "Failed", message: "Friendship already exist" });

        await FriendModel.insertMany([{ friendshipID }, { friendshipID: friendshipID2 }]);

        res.status(200).json({ status: "Success", message: "Friendship created" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }

}

const friends = () => async (req, res) => {

    const { _id } = req;

    try {

        let friendship = await FriendModel.aggregate([
            { $match: { 'friendshipID.accountID': mongoose.Types.ObjectId(_id) } },
            {
                $lookup:
                {
                    from: "accounts",
                    localField: "friendshipID.friendID",
                    foreignField: "_id",
                    as: "accounts"
                }
            },
            {
                $unwind: "$accounts"
            },
            {
                $project: {
                    "accounts._id": 1,
                    "accounts.name": 1,
                    "accounts.lastName": 1,
                }
            },
        ]);

        friendship = friendship.map((data) => data.accounts);

        res.status(200).json({ status: "Success", data: friendship });

    } catch (e) {

        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });

    }
}

module.exports = { addFriend, friends };