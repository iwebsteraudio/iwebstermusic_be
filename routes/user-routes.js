const userRouter = require("express").Router();
const { sendUserData, postUser } = require("./controllers/users-controllers");

userRouter.route("/").get(sendUserData);
userRouter.route("/:username").get(sendUserByUsername);
userRouter.route("/").post(postUser);
