import { useState } from "react";
import { searchMovies } from "../utils/Api";

export default function MovieSearch() {
  const [query, setQuery] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await searchMovies(query);

    console.log(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="query">
        Movie Name
      </label>

      <input
        className="input"
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Batman Begins"
      />

      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
}
