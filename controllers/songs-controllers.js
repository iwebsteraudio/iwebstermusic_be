const { fetchSongs, postSong, deleteSong } = require("../models/songs-models");

exports.sendSongsData = (req, res, next) => {
  fetchSongs()
    .then((songData) => {
      res.status(200).send({ songData });
    })
    .catch(next);
};

exports.postSongData = (req, res, next) => {
  postSong(req.body)
    .then((newSong) => {
      res.status(201).send({ songData: newSong });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteSongById = (req, res, next) => {
  const { song_id } = req.params;

  deleteSong(song_id)
    .then(()=>{
      res.status(204).send()
    })
    .catch((err)=> {
      next(err)
    })
}



exports.sendCustom404 = (req, res, next) => {
  res
    .status(404)
    .send({ msg: "I don't know what you're looking for here, sorry!" });
};
