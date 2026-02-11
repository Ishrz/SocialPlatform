

const logger = (req,res,next)=>{
    console.log("_________Logger middleware__________")
    console.log(`coming request method : ${req.method}`)
    console.log(`base Url of request : ${req.baseUrl}`)
    console.log(`request Path Name : ${req._parsedUrl.pathname}`)
    console.log(`request URL : ${req.url}`)
    console.log(`orignal URL: ${req.originalUrl}`)
    console.log("_______Logger middleware end_____")

    next()
}


module.exports=logger