const { fetchSongs } = require("../models/songs-models");

exports.sendSongData = (req, res, next) => {
  fetchSongs()
    .then((songData) => {
      res.status(200).send({ songData });
    })
    .catch(next);
};

exports.sendCustom404 = ( req, res, next) => {
    res.status(404).send({msg: "I don't know what you're looking for here, sorry!"})
}
