const express = require("express")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage()})

const logger = require("../middlewares/logger.middleware.js")
const createPost = require("../controllers/post.controller.js")


const postRouter= express.Router()



postRouter.post("/" ,logger , upload.single("imgUrl"), createPost)


module.exports = postRouter