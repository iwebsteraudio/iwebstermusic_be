const express = require("express");
const apiRouter = express.Router();

const songRouter = require("./song-router");
const emailRouter = require("./email-router");
const userRouter = require("./user-router");
const mp3Router = require("./mp3-router")
const apiData = require("../endpoints.json");


apiRouter.use("/songs", songRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/send-email", emailRouter);
apiRouter.use("/mp3s", mp3Router)

apiRouter.route("/").get((req, res) => {
  res.status(200).send(apiData);
});

module.exports = apiRouter;
