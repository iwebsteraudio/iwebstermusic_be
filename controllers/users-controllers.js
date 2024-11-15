const { fetchUserData, postUserData } = require("../models/user-models");

exports.sendUserData = (req, res, next) => {
  fetchUserData()
    .then((userData) => {
      res.status(200).send({ userData });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  postUserData(username, emailAddress, forename, surname, status)
    .then((userData) => {
      res.status(200).send({ userData });
    })
    .catch(next);
};

