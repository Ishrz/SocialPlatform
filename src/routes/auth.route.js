const express = require("express")
const {registraion} = require("../controllers/auth.controller.js")
const logger = require("../middlewares/logger.middleware.js")

const authRoute= express.Router()



authRoute.post("/registration", logger , registraion)




module.exports=authRoute