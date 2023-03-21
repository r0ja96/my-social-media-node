const { AccountModel, FriendModel } = require('../../models');


const addFriend = () => async (req, res) => {

    const { friendID } = req.body;
    const { _id } = req;

    const friendshipID = { accountID: _id, friendID }
    const friendshipID2 = { accountID: friendID, friendID: _id }
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

        let friendship = await FriendModel.find({ 'friendshipID.accountID': _id }, { 'friendshipID.accountID': 0, _id: 0, __v: 0 });

        friendship = friendship.map(({ friendshipID }) => friendshipID.friendID ? friendshipID.friendID : null);

        const accounts = await AccountModel.find({ _id: { $in: friendship } }, { name: 1, lastName: 1 }).sort({ _id: -1 }).limit(10);

        //const accounts = await AccountModel.find({ _id: { $not: { $in: friendship } } }, { name: 1, lastName: 1 }).sort({ _id: -1 }).limit(10);

        res.status(200).json({ status: "Success", data: accounts });

    } catch (e) {

        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });

    }
}

module.exports = { addFriend, friends };