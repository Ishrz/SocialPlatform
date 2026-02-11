const express = require("express")
const {registraion} = require("../controllers/auth.controller.js")

const authRoute= express.Router()



authRoute.post("/registration" , registraion)




module.exports=authRoute