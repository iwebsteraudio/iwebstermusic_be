const express = require("express");
const userRouter = express.Router();
const { sendUserData, postUser } = require("../controllers/users-controllers");

userRouter.route("/").get(sendUserData);
userRouter.route("/").post(postUser);

module.exports = userRouter;