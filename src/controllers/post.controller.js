const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model.js");
// const { Folders } = require("@imagekit/nodejs/resources/index.js");

async function createPost(req, res) {
  const { token } = req.cookies;
  const { caption } = req.body;
  const { buffer } = req.file;

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = verifiedToken;

    //imagekit secret
    const client = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });

    //uploading file/image to service provider
    const response = await client.files.upload({
      file: await toFile(Buffer.from(buffer), "file"),
      fileName: "file-name.jpg",
      folder: "instaClone",
    });

    const imgUrl = response.url;
    const Post = await postModel.create({
      userId: id,
      imgUrl: imgUrl,
      caption: caption,
    });

    res.status(201).json({
      message: "post created successfully",
      data: Post,
    });
  } catch (err) {
    console.log(`Error at create Post : ${err}`);
    res.json({
      message: `something went wrong`,
      error: err,
    });
  }
}

//user all posts controller
async function getAllUserPosts(req, res) {
  const token = req.cookies.token
  
  try{
    const verifiedToken= jwt.verify(token, process.env.JWT_SECRET)

    const userId = verifiedToken.id
    
    const user =await postModel.find({
      userId:userId
    })

    res.status(200).json({
      message:"user post fetch successfully",
      posts:user
    })

  }catch(err){
    console.log(`Error aagya :  ${err}`)
    res.status(403).json({
      message:"not authorized user"
    })
  }

}

async function getUserPosts(req,res){

  const token =req.cookies.token

  if(!token){
    return res.status(401).json({
      message
:"Unauthrized access"    })
  }

  const {postId} = req.params
 
  try{
    const verifiedToken = jwt.verify(token,process.env.JWT_SECRET)

    // const userId

  }catch(err){
    return res.status(401).json({
      message:"Unauthrized access"
    })
  }

  const post = await postModel.findById(postId)
  console.log(post.userId)

  const isValidUser = post.userId.equals(postId)
  console.log(isValidUser)
  if(!isValidUser){
    return res.status(403).json({
      message:"Access Forbidden"
    })
  }

  res.status(200).json({
    message:"post details fetched successfully",
    potsDetails:post
  })


}

module.exports = {
  createPost,
  getAllUserPosts,
  getUserPosts
};
