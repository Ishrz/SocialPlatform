const express = require("express")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage()})

const logger = require("../middlewares/logger.middleware.js")
const tokenVerification = require("../middlewares/auth.middleware.js")

//controllers
const {createPost} = require("../controllers/post.controller.js")
const{ getAllUserPosts, getUserPosts} = require("../controllers/post.controller.js")

const postRouter= express.Router()


//creating post
postRouter.post("/" ,logger , upload.single("imgUrl"), tokenVerification , createPost)
//getting all posts
postRouter.get("/", logger , tokenVerification , getAllUserPosts)
//getting specific user posts
postRouter.get('/details/:postId' , logger , tokenVerification, getUserPosts)

//post likes
//POST v1/api/post/likes/:postId
postRouter.post("/likes/:postId" , logger , tokenVerification , likePostController)

module.exports = postRouter