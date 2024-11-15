const express = require("express");
const mp3Router = express.Router();
const { getMp3Url } = require("../controllers/s3-controllers");

mp3Router.route("/").get(getMp3Url);

module.exports = mp3Router;
