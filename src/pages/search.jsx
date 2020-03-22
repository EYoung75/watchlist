import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Search(props) {
  const [movieResults, setMovieResults] = useState([]);
  const [TVResults, setTVResults] = useState([]);

  useEffect(() => {
    handleSearch(props.match.params["search"]);
  }, []);

  async function handleSearch(term) {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${term}`
    )
      .then(res => res.json())
      .then(res => setMovieResults(res.results));
    await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${term}`
    )
      .then(res => res.json())
      .then(res => setTVResults(res.results));
  }

  return (
    <div className="search">
      <h2>Results for "{props.match.params["search"]}"</h2>
      <h4>{movieResults.length} results in Movies:</h4>
      {movieResults.map(movie => (
        <Link to={`/movie/${movie["id"]}`}>
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        </Link>
      ))}
      <h4>{TVResults.length} results in TV:</h4>
      {TVResults.map(tv => (
        <Link to={`/show/${tv["id"]}`}>
          <div>
            <h3>{tv.name}</h3>
            <p>{tv.overview}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Search;
