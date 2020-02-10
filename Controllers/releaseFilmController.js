const ReleaseFilm = require("../Models/releaseFilm");

exports.getReleaseFilms = function(req, res) {
  ReleaseFilm.find({}, (err, films) => {
    if (err) return console.error(err);

    res.send(films);
  });
};
exports.getReleaseFilm = function(req, res) {
  const id = req.params.id;
  ReleaseFilm.findById(id, (err, film) => {
    if (err) return console.log(err);

    res.send(film);
  });
};

exports.addComment = async function(req, res) {
  const id = req.params.id;
  const comment = req.body;
  console.log("comment");
  try {
    const film = await ReleaseFilm.findById(id);

    film.comments.push(comment);

    try {
      await film.save();
      res.status(200).json(film);
    } catch (e) {
      if (e) return console.log(e);
      res.stauts(500);
    }
  } catch (e) {
    res.status(404).json({
      message: "Фильм не найден"
    });
  }
};

exports.deleteComment = async function(req, res) {
  const filmId = req.params.filmId;
  const commentId = req.params.commentId;
  try {
    const film = await ReleaseFilm.findById(filmId);
    film.comments.id(commentId).remove();

    try {
      await film.save();
      res.status(200).json(film);
    } catch (e) {
      if (e) console.log(e);
      res.stauts(500);
    }
  } catch (e) {
    res.status(404).json({
      message: "Фильм не найден"
    });
  }
};

exports.updateReleaseComment = async function(req, res) {
  if (!req.body) return res.sendStatus(400);
  const filmId = req.params.filmId;
  const commentId = req.body._id;

  try {
    const film = await ReleaseFilm.findById(filmId);
    let commentById = film.comments.id(commentId);
    commentById.body = req.body.body;
    commentById.date = req.body.date;

    try {
      await film.save();
      res.status(200).json(film);
    } catch (e) {
      if (e) console.log(e);
      res.stauts(500);
    }
  } catch (e) {
    res.status(404).json({
      message: "Фильм не найден"
    });
  }
};

exports.addReleaseFilm = function(req, res) {
  if (!req.body) return res.sendStatus(400);
  const newFilm = new ReleaseFilm({ ...req.body });
  newFilm.save(err => {
    if (err) return console.log(err);
    ReleaseFilm.findOne({ ...req.body }, (err, film) => {
      if (err) return console.log(err);
      res.send(film);
    });
  });
};
exports.updateReleaseFilm = function(req, res) {
  if (!req.body) return res.sendStatus(400);
  const id = req.body._id;
  ReleaseFilm.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true },
    (err, film) => {
      if (err) return console.log(err);

      res.send(film);
    }
  );
};

exports.deleteReleaseFilm = function(req, res) {
  const id = req.params.id;
  ReleaseFilm.findByIdAndDelete(id, (err, doc) => {
    if (err) return console.log(err);

    res.send(doc._id);
  });
};

exports.rateFilm = async function(req, res) {
  const filmId = req.params.filmId;

  const { user, type } = req.body;
  try {
    const film = await ReleaseFilm.findById(filmId);
    const candidate = await film.rates.find(rate => rate.user === user);
    if (!candidate) {
      film.rates.push({ user, type });
    } else {
      if (candidate.type !== type) {
        film.rates = film.rates.map(rate => {
          if (rate._id === candidate._id) {
            let newRate = rate;
            newRate.type = type;
            return newRate;
          } else return rate;
        });
      } else {
        return res.status(304).send({
          message: "Пользователь уже оценил фильм"
        });
      }
    }
    try {
      await film.save();
      res.status(200).json(film);
    } catch (e) {
      if (e) console.log(e);
      res.stauts(500);
    }
  } catch (e) {
    res.status(404).json({
      message: "Фильм не найден"
    });
  }
};
