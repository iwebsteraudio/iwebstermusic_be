const { listAllFiles } = require("../models/s3-models");

exports.getAllMp3Urls = (req, res, next) => {
  listAllFiles()
    .then((mp3Data) => {
      res.status(200).send({ mp3Data });
    })
    .catch(next);
};
