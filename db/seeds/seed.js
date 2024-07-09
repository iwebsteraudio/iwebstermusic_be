const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData, songsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS songs;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      const usersTablePromise = db.query(
        `
            CREATE TABLE users (
            username VARCHAR PRIMARY KEY NOT NULL,
            emailAddress VARCHAR NOT NULL,
            forename VARCHAR NOT NULL,
            surname VARCHAR NOT NULL,
            status VARCHAR NOT NULL
            );`
      );

      const songsTablePromise = db.query(`
            CREATE TABLE songs (
            artist VARCHAR NOT NULL,
            title VARCHAR PRIMARY KEY NOT NULL,
            genre VARCHAR NOT NULL,
            decade VARCHAR NOT NULL,
            path VARCHAR
            );
            `);

      return Promise.all([usersTablePromise, songsTablePromise]);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        `INSERT INTO users (username, emailAddress, forename, surname, status) VALUES %L;`,
        userData.map(({ username, emailAddress, forename, surname, status }) => [
          username,
          emailAddress,
          forename,
          surname,
          status,
        ])
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      const insertSongsQueryStr = format(
        `INSERT INTO songs (artist, title, genre, decade, path) VALUES %L;`,
        songsData.songs.map(({ artist, title, genre, decade, path }) => [
          artist,
          title,
          genre,
          decade,
          path,
        ])
      );
      return db.query(insertSongsQueryStr);
    });
};

module.exports = seed;
