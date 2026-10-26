const {
  searchMovies,
  getPopularMovies,
  getMovieDetails,
  getMovieCast,
  getSimilarMovies,
  getGenres,
  getMoviesByGenre,
} = require("../services/tmdbService");

async function getMovies(req, res) {
  try {
    const data = await searchMovies(req.query.q);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function popularMovies(req, res) {
  try {
    const data = await getPopularMovies();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function movieDetails(req, res) {
  try {
    const data = await getMovieDetails(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function movieCast(req, res) {
  try {
    const data = await getMovieCast(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function similarMovies(req, res) {
  try {
    const data = await getSimilarMovies(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function genres(req, res) {
  try {
    const data = await getGenres();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function moviesByGenre(req, res) {
  try {
    const data = await getMoviesByGenre(req.params.genreId);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  getMovies,
  popularMovies,
  movieDetails,
  movieCast,
  similarMovies,
  genres,
  moviesByGenre,
};
