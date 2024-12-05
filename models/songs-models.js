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

exports.postSong = ({ artist, title, genre, decade }) => {
  if (!artist || !title || !genre || !decade) {
    return Promise.reject({
      status: 400,
      msg: "Missing Required Fields",
    });
  }

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
    })
    .catch((err) => {
      console.error(err);
      next({
        status: 500,
        msg: "Database query failed",
        details: err.message,
      });
    });
};

exports.deleteSong = (id) => {
  return db
    .query(`DELETE FROM songs WHERE song_id = $1 RETURNING *;`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Song not found",
        });
      }
      return rows[0];
    })
    .catch((err) => {
      console.error(err);
      throw {
        status: 500,
        msg: "Database query failed",
        details: err.message,
      };
    });
};
