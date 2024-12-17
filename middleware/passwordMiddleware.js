const bcrypt = require("bcrypt");

exports.checkPassword = (req, res, next) => {
  const { password } = req.body;

  const storedHashedPassword = process.env.ADMIN_PASSWORD;

  if (!password) {
    return res.status(401).send({ msg: "Password is required." });
  }

  bcrypt
    .compare(password, storedHashedPassword)
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
