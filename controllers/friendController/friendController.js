const FriendModel = require('../../models/friendModel/friendModel');


const addFriend = () => async (req, res) => {

    const { friendID } = req.body;
    const { _id } = req;

    const friendshipID = { accountID: _id, friendID }

    try {
        const friendshipExist = await FriendModel.findOne({ friendshipID });

        if (friendshipExist) return res.status(400).json({ status: "Failed", message: "Friendship already exist" });

        const newFriendship = new FriendModel({ friendshipID });

        await newFriendship.save();

        res.status(200).json({ status: "Success", message: "Friendship created" });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "Failed", message: "Something went wrong" });
    }

}

module.exports = { addFriend };