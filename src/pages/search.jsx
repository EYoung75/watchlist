import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

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
      {console.log(movieResults)}
      <div className="search__header">
        <Link to="/">
          <FaWindowClose className="search__header__close" />
        </Link>
        <h2>Results for "{props.match.params["search"]}"</h2>
      </div>
      {movieResults.length === 0 && TVResults.length === 0 ? (
        <div className="search__empty">
          Sorry, no results for '{props.match.params["search"]}' were found.
        </div>
      ) : (
        <div>
          <h4>{movieResults.length} results in Movies:</h4>
          <div className="search__container">
            {movieResults.map(movie => (
              <Link to={`/movie/${movie["id"]}`}>
                <div className="search__result">
                  <h3>{movie.title}</h3>
                  <p>{movie.overview.substring(0, 100) + "..."}</p>
                </div>
              </Link>
            ))}
          </div>
          <h4>{TVResults.length} results in TV:</h4>
          <div className="search__container">
            {TVResults.map(tv => (
              <Link to={`/show/${tv["id"]}`} key={tv.name}>
                <div className="search__result">
                  <h3>{tv.name}</h3>
                  <p>{tv.overview.substring(0, 100) + "..."}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
