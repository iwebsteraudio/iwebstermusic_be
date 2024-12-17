const bcrypt = require("bcrypt");

exports.checkPassword = (req, res, next) => {
  const { authorization } = req.headers;

  const storedHashedPassword = process.env.ADMIN_PASS;

  if (!authorization) {
    return res.status(401).send({ msg: "Password is required." });
  }

  bcrypt
    .compare(authorization, storedHashedPassword)
    .then((isMatch) => {
      if (!isMatch) {
        return res.status(403).send({ msg: "Invalid password." });
      }
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ msg: "Internal Server Error" });
    });
};
