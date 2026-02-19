const express = require("express")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage()})

const logger = require("../middlewares/logger.middleware.js")

//controllers
const {createPost} = require("../controllers/post.controller.js")
const{ getAllUserPosts, getUserPosts} = require("../controllers/post.controller.js")

const postRouter= express.Router()



postRouter.post("/" ,logger , upload.single("imgUrl"), createPost)

postRouter.get("/", logger , getAllUserPosts)

postRouter.get('/details/:postId' , logger , getUserPosts)


module.exports = postRouter