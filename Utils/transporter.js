const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ВАША ПОЧТА",
    pass: "ПАРОЛЬ ОТ ПОЧТЫ"
  }
});
