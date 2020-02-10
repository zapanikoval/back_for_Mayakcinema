const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const { mongoURL } = require("./Config/keys");

const soonFilmRouter = require("./Routes/soonFilmRouter.js");
const releaseFilmRouter = require("./Routes/releaseFilmRouter.js");
const authRouter = require("./Routes/authRouter");


const app = express();

mongoose.connect(
  mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) return console.log(err);

    app.listen(5000, () => {
      console.log("Сервер запущен. Ожидает подключения");
    });
  }
);

app.use(passport.initialize());
require("./Middleware/passport.js")(passport);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/films/soon", soonFilmRouter);
app.use("/films/release", releaseFilmRouter);
app.use("/auth", authRouter);
