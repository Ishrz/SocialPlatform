const express = require("express")

const tokenVerification  = require("../middlewares/auth.middleware.js")

const followUserController = require("../controllers/followUser.controller.js")

const userRouter = express.Router()


userRouter.post("/follow/:username" , followUserController)





module.exports = userRouter