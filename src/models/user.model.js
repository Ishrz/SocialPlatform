const mongoose = require("mongoose")



const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    bio:String,
    profilepic:String
})



const userModel=mongoose.model("user",userSchema)


module.exports= userModel