const app =require("./src/app.js")
require("dotenv").config()



const PORT= process.env.PORT || 4000;



app.listen(PORT,()=>{

    console.log(`Server is started on port : ${PORT}`)

})