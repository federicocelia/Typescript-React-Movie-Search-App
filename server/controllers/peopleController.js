const { searchPeople, getPersonMovies } = require("../services/tmdbService");

async function search(req, res) {
  try {
    const query = req.query.q;

    const data = await searchPeople(query);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function movies(req, res) {
  try {
    const data = await getPersonMovies(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  search,
  movies,
};
