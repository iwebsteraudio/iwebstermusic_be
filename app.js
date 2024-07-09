const express = require("express");
const app = express();
const { sendUserData } = require("./controllers/users-controllers");
const cors = require("cors");

app.use(cors());

app.get("api/users", sendUserData);

app.post("/api/users", postUser);

// need to be able to get song data, user data, post a user, post a song

app.use(express.json());

app.all("*", sendCustom404);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (
    err.code === "22P02" ||
    err.code === "42703" ||
    err.code === "23503"
  ) {
    res.status(400).send({ msg: "Bad Request" });
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;