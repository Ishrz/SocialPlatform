const express = require("express");

const tokenVerification = require("../middlewares/auth.middleware.js");
const logger = require("../middlewares/logger.middleware.js");
const {followUserController , unfollowUserController} = require("../controllers/user.controller.js");

const userRouter = express.Router();

userRouter.post(
  "/follow/:username",
  logger,
  tokenVerification,
  followUserController
);

userRouter.post(
    "/unfollow/:username",
    logger,
    tokenVerification,
    unfollowUserController
)

module.exports = userRouter;
