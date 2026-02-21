const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//routes
const authRoute = require("./routes/auth.route.js")
const postRouter = require("./routes/post.route.js")
const userRouter = require("./routes/user.route.js")

const app = express()

//aplication level middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}))

//routers
app.use("/v1/api/user" , authRoute)
app.use("/v1/api/post" , postRouter)
app.use("/v1/api/users" , userRouter)





module.exports= app