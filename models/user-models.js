const db = require("../db/connection");

exports.fetchUserData = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    if (!rows[0]) {
      return Promise.reject({
        status: 404,
        msg: "User Not Found",
      });
    }
    return rows;
  });
};

exports.postUserData = (username, emailAddress, forename, surname, status) =>{
  return db.query(`INSERT INTO users
    (username, emailAddress, forename, surname, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`,
  [username, emailAddress, forename, surname, status])
  .then(({ rows }) =>{
    return rows[0]
  })
}

exports.fetchSongsData = () => {
  return db.query(`SELECT * FROM songs;`).then(({ rows }) => {
    if (!rows[0]) {
      return Promise.reject({
        status: 404,
        msg: "Song Not Found"
      });
    }
  })
}
