const express = require("express");
const emailRouter = express.Router();
const emailController = require("../controllers/email-controllers");

emailRouter.post("/", emailController.sendEmail);

module.exports = emailRouter;
