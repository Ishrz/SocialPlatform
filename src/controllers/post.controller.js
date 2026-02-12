const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel= require("../models/post.model.js")

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
    });

    const imgUrl=response.url
    const Post=await postModel.create({
        userId:id,
        imgUrl:imgUrl,
        caption:caption
    })

    res.status(201).json({
      message: "post created successfully",
      data:Post
    });
  } catch (err) {
    console.log(`Error at create Post : ${err}`);
    res.json({
      message: `something went wrong`,
      error: err,
    });
  }
}

module.exports = createPost;
