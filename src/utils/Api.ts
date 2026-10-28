const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const REQUEST_TIMEOUT_MS = 10_000;

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface RawMovieSearchResponse {
  page: number;
  results: unknown[];
  total_pages: number;
  total_results: number;
}

function isMovie(movie: unknown): movie is Record<string, unknown> {
  if (!movie || typeof movie !== "object") {
    return false;
  }

  const m = movie as Record<string, unknown>;

  return typeof m.id === "number" && typeof m.title === "string";
}

function normalizeMovie(movie: Record<string, unknown>): Movie {
  return {
    id: typeof movie.id === "number" ? movie.id : 0,

    title: typeof movie.title === "string" ? movie.title : "Unknown Title",

    overview: typeof movie.overview === "string" ? movie.overview : "",

    poster_path:
      typeof movie.poster_path === "string" ? movie.poster_path : null,

    backdrop_path:
      typeof movie.backdrop_path === "string" ? movie.backdrop_path : null,

    release_date:
      typeof movie.release_date === "string" ? movie.release_date : "",

    vote_average:
      typeof movie.vote_average === "number" ? movie.vote_average : 0,

    vote_count: typeof movie.vote_count === "number" ? movie.vote_count : 0,

    popularity: typeof movie.popularity === "number" ? movie.popularity : 0,

    adult: typeof movie.adult === "boolean" ? movie.adult : false,

    original_language:
      typeof movie.original_language === "string"
        ? movie.original_language
        : "unknown",
  };
}

function isMovieSearchResponse(data: unknown): data is RawMovieSearchResponse {
  if (!data || typeof data !== "object") {
    return false;
  }

  const response = data as Record<string, unknown>;

  return (
    typeof response.page === "number" &&
    typeof response.total_pages === "number" &&
    typeof response.total_results === "number" &&
    Array.isArray(response.results)
  );
}

export async function searchMovies(
  query: string,
): Promise<MovieSearchResponse> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new Error("Search query cannot be empty.");
  }

  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Check your .env configuration.");
  }

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const url = new URL(`${BASE_URL}/search/movie`);

    url.searchParams.set("api_key", API_KEY);
    url.searchParams.set("query", trimmedQuery);
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");
    url.searchParams.set("include_adult", "false");

    console.log(url.toString());

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `TMDB request failed (${response.status} ${response.statusText})`,
      );
    }

    const data: unknown = await response.json();

    if (!isMovieSearchResponse(data)) {
      throw new Error("TMDB returned an unexpected response format.");
    }

    const normalizedResults = data.results.filter(isMovie).map(normalizeMovie);

    return {
      page: data.page,
      results: normalizedResults,
      total_pages: data.total_pages,
      total_results: data.total_results,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds.`,
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unknown error occurred.");
  } finally {
    clearTimeout(timeoutId);
  }
}
