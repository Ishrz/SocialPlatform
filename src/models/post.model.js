const mongoose = require("mongoose");

const postShcema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    imgUrl: {
      type: String,
      required: [true, "image url is required"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("post", postShcema);

module.exports = postModel;
