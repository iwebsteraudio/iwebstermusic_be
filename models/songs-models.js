const db = require("../db/connection")

exports.fetchSongs = () => {
    return db.query(`SELECT * FROM songs;`).then(({ rows }) => {
        if (!rows[0]) {
            return Promise.reject({
                status: 404,
                msg: "Not Found"
            })
        }
        return rows;
    })
}