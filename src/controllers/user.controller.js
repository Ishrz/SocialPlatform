const followModel = require("../models/follow.model.js");
const userModel = require("../models/user.model.js");

//follow controller
const followUserController = async (req, res) => {
  const username = req.user.username;
  const followeeUsername = req.params.username;

  if (username == followeeUsername)
    return res.status(409).json({
      message: "Cant Folllow yourself Dear",
    });

  //check followee is exist or not
  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist)
    return res.status(401).json({
      message: `not found person with this name ${followeeUsername}`,
    });

  const isAlreadyfollowed = await followModel.findOne({
    follower: username,
    followee: followeeUsername,
  });

  if (isAlreadyfollowed)
    return res.status(409).json({
      message: `You already followed ${followeeUsername}`,
    });

  const FollowData = await followModel.create({
    follower: username,
    followee: followeeUsername,
  });

  console.log(FollowData);

  res.status(201).json({
    message: `Your are now following ${followeeUsername}`,
    data: FollowData,
  });
};

//unfollow controller
const unfollowUserController = async (req, res) => {
  const username = req.user.username;
  const followeeUsername = req.params.username;

  const isFollowed = await followModel.findOne({
    follower: username,
    followee: followeeUsername,
  });

  if (!isFollowed)
    return res.json({
      message: `Your are not following this person ${followeeUsername}`,
    });

  const DeletedData = await followModel.findByIdAndDelete(isFollowed._id);

  //   console.log(DeletedData)

  res.status(200).json({
    message: `Unfollow ${followeeUsername} successfully`,
  });
};

module.exports = {
  followUserController,
  unfollowUserController,
};
