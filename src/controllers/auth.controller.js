const {registrationsSchema } = require("../middlewares/zodSchemas.js")
const userModel= require("../models/user.model.js")



async function registraion(req,res) {
        console.log("_____registration route hit_____________")
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

        const userReg= await userModel.create({
            username,
            email,
            password,
            bio,
            profilepic
        })
        

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






module.exports = {
    registraion
}