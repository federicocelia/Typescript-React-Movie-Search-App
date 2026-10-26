const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  "Content-Type": "application/json",
};

async function makeRequest(endpoint) {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, { headers });

  if (!response.ok) {
    throw new Error("TMDB request failed");
  }

  return response.json();
}

async function searchMovies(query) {
  return makeRequest(`/search/movie?query=${encodeURIComponent(query)}`);
}

async function getPopularMovies() {
  return makeRequest("/movie/popular");
}

async function getMovieDetails(id) {
  return makeRequest(`/movie/${id}`);
}

async function getMovieCast(id) {
  return makeRequest(`/movie/${id}/credits`);
}

async function getSimilarMovies(id) {
  return makeRequest(`/movie/${id}/similar`);
}

async function getGenres() {
  return makeRequest("/genre/movie/list");
}

async function getMoviesByGenre(genreId) {
  return makeRequest(`/discover/movie?with_genres=${genreId}`);
}

async function searchPeople(query) {
  return makeRequest(`/search/person?query=${encodeURIComponent(query)}`);
}

async function getPersonMovies(id) {
  return makeRequest(`/person/${id}/movie_credits`);
}

module.exports = {
  searchMovies,
  getPopularMovies,
  getMovieDetails,
  getMovieCast,
  getSimilarMovies,
  getGenres,
  getMoviesByGenre,
  searchPeople,
  getPersonMovies,
};
