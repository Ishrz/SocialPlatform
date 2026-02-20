const mongoose = require("mongoose")


const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:[true,"post id is required"]
    },
    user:{
        type:String,
        ref:"user",
        required:[true, "username is required"]
    }
},{
    timestamps:true
})

likeSchema.index({postId:1 , user : 1 } , {unique:true})



const likeModel = mongoose.model("like" , likeSchema)

module.exports = likeModel