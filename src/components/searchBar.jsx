import React, { useState, useEffect } from "react";

function SearchBar(props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(term) {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${term}`
    )
      .then(res => res.json())
      .then(res => setResults(res.results))
      .then()

  }
  return (
    <div className={props.collapsed ? "collapsed" : "searchBar"}>
      <label for="search">Search:</label>
      <input id="search" onChange={e => setSearch(e.target.value)} />
      <button onClick={() => handleSearch(search)}>Search</button>
      {console.log(results)}
      {/* {results.length > 0 ? (
        <div className="results">{JSON.stringify(results)}</div>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default SearchBar;
