const express = require("express");
const mp3Router = express.Router();
const { getAllMp3Urls } = require("../controllers/s3-controllers");

mp3Router.route("/").get(getAllMp3Urls);

module.exports = mp3Router;
