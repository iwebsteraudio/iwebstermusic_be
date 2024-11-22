const db = require("../db/connection");

exports.fetchSongs = () => {
  return db.query(`SELECT * FROM songs;`).then(({ rows }) => {
    if (!rows[0]) {
      return Promise.reject({
        status: 404,
        msg: "Not Found",
      });
    }
    return rows;
  });
};

exports.postSong = () => {
  return db
    .query(
      `INSERT INTO songs
        (artist, title, genre, decade)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,

      [artist, title, genre, decade]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
