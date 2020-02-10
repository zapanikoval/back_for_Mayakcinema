const express = require("express");
const releaseFilmController = require("../Controllers/releaseFilmController.js");
const passport = require("passport");
const releaseFilmRouter = express.Router();

releaseFilmRouter.get("/", releaseFilmController.getReleaseFilms);
releaseFilmRouter.get("/get/:id", releaseFilmController.getReleaseFilm);
releaseFilmRouter.put("/rate/:filmId", releaseFilmController.rateFilm);
releaseFilmRouter.put(
  "/update_comment/:filmId",
  releaseFilmController.updateReleaseComment
);
releaseFilmRouter.post(
  "/add_comment/:id",
  passport.authenticate("jwt", { session: false }),
  releaseFilmController.addComment
);
releaseFilmRouter.delete(
  "/delete_comment/:filmId/:commentId",
  passport.authenticate("jwt", { session: false }),
  releaseFilmController.deleteComment
);
releaseFilmRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  releaseFilmController.addReleaseFilm
);
releaseFilmRouter.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  releaseFilmController.updateReleaseFilm
);
releaseFilmRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  releaseFilmController.deleteReleaseFilm
);

module.exports = releaseFilmRouter;
