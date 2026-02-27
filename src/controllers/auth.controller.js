const {registrationsSchema ,loginSchema} = require("../middlewares/zodSchemas.js")
const userModel= require("../models/user.model.js")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")


async function registraion(req,res) {
        console.log("_____registration controller hit_____________")
        const parseBody =await registrationsSchema.safeParse(req.body)
        if(!parseBody.success){
            res.json({
                error:parseBody.error.message
            })
        }

        req.body=parseBody.data
        const {username,password,email,bio,profilepic} = req.body

        
    try{

        const isUserExist= await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })

        // console.log(isUserExist)
        if(isUserExist){
            return res.json({
                message:(isUserExist.email == email) ? "already have account with this email id" : "username Already taken try diffrent"
            })
        }

        const hashPass=await bcrypt.hash(password, 5)
       

        const userReg= await userModel.create({
            username,
            email,
            password:hashPass,
            bio,
            profilepic
        })

        const token = jwt.sign({
            id:userReg._id,
            username: userReg.username
        }, process.env.JWT_SECRET, { expiresIn:"1h"})
        
        res.cookie("token",token)

        res.status(201).json({
            message: "registration successfull",
            data:{
                username:username,
                email:email
            }
        })



    }catch(err){
        console.log(`error at registration : ${err}`)
        return res.json({
            message:"somethig went wrong at registration please try after sometime"
        })
    }
}

async function login(req,res) {
    const parseData=loginSchema.safeParse(req.body)
    if(!parseData.success) return res.json({
        error : parseData.error.flatten()
    })
    req.body=parseData.data
    
    const {email,password} = req.body

    const isUserExist= await userModel.findOne({email})
    if(!isUserExist) return res.json({message:"Invalid user"})
    
    const hashPass= await bcrypt.compare(password, isUserExist.password)
    
     

    if(!hashPass) return res.json({
        message:"Password not match"
    })


    const token=jwt.sign({id:isUserExist._id , username: isUserExist.username} , process.env.JWT_SECRET ,{ expiresIn:"1h"})

    // console.log(token)

    res.cookie("token",token)

    res.status(201).json({
        message:"Login Successfull",
    })
}

async function getMe(req, res){
    const {id }=req.user
    try{
        const user = await userModel.findById(id).select("-password")
        console.log(user)

        res.status(200).json({
            message:"user fetch successfuly",
            data:user
        })

    }catch(err){
        console.log(err.message)
        res.status(404).json({
            message:"User not found"
        })
    }
    
}


module.exports = {
    registraion,
    login,
    getMe
}