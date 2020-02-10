const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "super.ilna.78952@gmail.com",
    pass: "Maledict228"
  }
});
