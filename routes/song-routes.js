const songRouter = require("express").Router();
const { sendSongsData } = require("../controllers/songs-controllers");

songRouter.route("/").get(sendSongsData);

module.exports = songRouter;
