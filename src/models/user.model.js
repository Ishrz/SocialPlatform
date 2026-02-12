const mongoose = require("mongoose")



const userSchema =new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already exist "],
        require:[true, "Username is required"]
    },
    email:{
        type:String,
        unique:[true, "Email id already exist "],
        require:[true, "Email id is required"]
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