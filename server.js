const app =require("./src/app.js")
const dbConnect = require("./src/config/dbConnection.js")
require("dotenv").config()



const PORT= process.env.PORT || 4000;

// database connection function
// dbConnect()

app.listen(PORT,()=>{

    console.log(`Server is started on port : ${PORT}`)

})