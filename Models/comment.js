const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = new Schema({
  senderName: String,
  date: {
    type: String,
    default: Date.now
  },
  body: String
});
