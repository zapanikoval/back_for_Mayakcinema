const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = require("./comment");
const RateSchema = require("./rate");
releaseFilmSchema = new Schema({
  type: String,
  link: String,
  smallPoster: String,
  fullPoster: String,
  name: String,
  yearLimit: String,
  originalName: String,
  producer: String,
  releaseTime: String,
  rate: String,
  style: String,
  time: String,
  studio: String,
  mainRoles: String,
  description: String,
  rates: [RateSchema],
  comments: [CommentSchema]
});

module.exports = mongoose.model("ReleaseFilm", releaseFilmSchema);
