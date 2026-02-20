const followModel = require("../models/follow.model.js")

const followUserController =async ( req,res) =>{
    const username = req.user.username
    const followeeUsername= req.params.username

    if(username == followeeUsername) return res.status(409).json({
        message: "Cant Folllow yourself Dear"
    })

    const FollowData = await followModel.create({
        follower:username,
        followee:followeeUsername
    })

    console.log(FollowData)

    res.status(201).json({
        message:`Your are now following $(followeeUsername)`,
        data:FollowData
    })



}





module.exports = followUserController