export default function MovieSearch() {
  return (
    <form className="form">
      <label classname="label" htmlFor="query">
        Movie Name
      </label>
      <input name="query" type="text" placeholder="Batman Begins" />
      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
}
