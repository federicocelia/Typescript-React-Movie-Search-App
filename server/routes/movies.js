const express = require("express");

const {
  getMovies,
  popularMovies,
  movieDetails,
  movieCast,
  similarMovies,
  genres,
  moviesByGenre,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/popular", popularMovies);

router.get("/search", getMovies);

router.get("/genres", genres);

router.get("/genre/:genreId", moviesByGenre);

router.get("/:id/cast", movieCast);

router.get("/:id/similar", similarMovies);

router.get("/:id", movieDetails);

module.exports = router;
