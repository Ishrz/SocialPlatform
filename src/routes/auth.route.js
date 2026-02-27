const express = require("express")
const {registraion, login} = require("../controllers/auth.controller.js")

const logger = require("../middlewares/logger.middleware.js")
const tokenVerification = require("../middlewares/auth.middleware.js")

const authRoute= express.Router()



authRoute.post("/registration", logger , registraion)

authRoute.post("/login", logger , login)

authRoute.get("/get-me", logger , tokenVerification,  getMe)


module.exports=authRoute