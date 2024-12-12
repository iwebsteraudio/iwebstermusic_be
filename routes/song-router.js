const express = require("express");
const songRouter = express.Router();
const {
  sendSongsData,
  postSongData,
  deleteSongById,
  patchSongById,
} = require("../controllers/songs-controllers");

songRouter.route("/").get(sendSongsData);
songRouter.route("/").post(postSongData);
songRouter.route("/:song_id").delete(deleteSongById);
songRouter.route("/:song_id").patch(patchSongById);

module.exports = songRouter;
