const express = require("express");
const songRouter = express.Router();

const {
  sendSongsData,
  postSongData,
  deleteSongById,
  patchSongById,
} = require("../controllers/songs-controllers");

const { checkPassword } = require("../middleware/passwordMiddleware");

songRouter.route("/").get(sendSongsData);

songRouter.route("/").post(checkPassword, postSongData);

songRouter.route("/:song_id").delete(checkPassword, deleteSongById);

songRouter.route("/:song_id").patch(checkPassword, patchSongById);

module.exports = songRouter;
