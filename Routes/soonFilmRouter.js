const express = require("express");
const soonFilmController = require("../Controllers/soonFilmController.js");
const passport = require("passport");
const soonFilmRouter = express.Router();

soonFilmRouter.get("/", soonFilmController.getSoonFilms);
soonFilmRouter.get("/get/:id", soonFilmController.getSoonFilm);
soonFilmRouter.put("/rate/:filmId", soonFilmController.rateFilm);
soonFilmRouter.put(
  "/update_comment/:filmId",
  soonFilmController.updateSoonComment
);
soonFilmRouter.post(
  "/add_comment/:id",
  passport.authenticate("jwt", { session: false }),
  soonFilmController.addComment
);
soonFilmRouter.delete(
  "/delete_comment/:filmId/:commentId",
  passport.authenticate("jwt", { session: false }),
  soonFilmController.deleteComment
);
soonFilmRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  soonFilmController.addSoonFilm
);
soonFilmRouter.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  soonFilmController.updateSoonFilm
);
soonFilmRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  soonFilmController.deleteSoonFilm
);

module.exports = soonFilmRouter;
