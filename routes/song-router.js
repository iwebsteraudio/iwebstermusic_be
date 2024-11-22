const express = require("express");
const songRouter = express.Router();
const {
  sendSongsData,
  postSongData,
} = require("../controllers/songs-controllers");

songRouter.route("/").get(sendSongsData);
songRouter.route("/").post(postSongData);

module.exports = songRouter;
