const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env.development" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (req, res) => {
  const { name, contactNumber, contactEmail, subject, date, message } =
    req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nContact Number: ${contactNumber}\nContact Email: ${contactEmail}\nSubject: ${subject} on ${date}\n\nMessage:\n${message}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error sending email", error });
  }
};
