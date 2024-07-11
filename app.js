require("dotenv").config({ path: "./.env.development" });

const express = require("express");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/api", emailRoutes);

const { sendUserData, postUser } = require("./controllers/users-controllers");
const {
  sendSongsData,
  sendCustom404,
} = require("./controllers/songs-controllers");

app.get("/api/users", sendUserData);
app.post("/api/users", postUser);
app.get("/api/songs", sendSongsData);

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
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error: Bleeding organs" });
});

module.exports = app;
