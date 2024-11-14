const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email-controllers");

router.post("/send-email", emailController.sendEmail);

module.exports = router;
