const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
        type:String
    //   type: mongoose.Types.ObjectId,
    //   ref: "user",
    //   require: [true, "Follower is required"],
    },

    followee: {
        type:String
    //   type: mongoose.Types.ObjectId,
    //   ref: "user",
    //   require: [true, "followee is required"],
    },
  },

  { timestamps: true }
);

followSchema.index({follower:1 , followee: 1 } , {unique: true})

const followModel = mongoose.model("follow" , followSchema)

module.exports = followModel
