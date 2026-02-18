const express = require("express")
const cookieParser = require("cookie-parser")


//routes
const authRoute = require("./routes/auth.route.js")
const postRouter = require("./routes/post.route.js")

const app = express()

//aplication level middleware
app.use(express.json())
app.use(cookieParser())

//routers
app.use("/v1/api/user" , authRoute)
app.use("/v1/api/post" , postRouter)





module.exports= app