const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: [true, "Follower is required"],
    },

    followee: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: [true, "followee is required"],
    },
  },

  { timestamps: true }
);

const followModel = mongoose.model("follow" , followSchema)

module.exports = followModel
