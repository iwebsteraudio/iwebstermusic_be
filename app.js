require("dotenv").config({ path: "./.env.production" });

const express = require("express");
const app = express();
const cors = require("cors");

const apiRouter = require("./routes/api-router");
const { sendCustom404 } = require("./controllers/songs-controllers");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

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
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
