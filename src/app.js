const express = require("express")
const authRoute = require("./routes/auth.route.js")

const app = express()

app.use(express.json())



app.use("/v1/api/user" , authRoute)





module.exports= app