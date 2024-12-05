const express = require("express");
const songRouter = express.Router();
const {
  sendSongsData,
  postSongData,
  deleteSongById,
} = require("../controllers/songs-controllers");

songRouter.route("/").get(sendSongsData);
songRouter.route("/").post(postSongData);
songRouter.route("/:song_id").delete(deleteSongById);

module.exports = songRouter;
