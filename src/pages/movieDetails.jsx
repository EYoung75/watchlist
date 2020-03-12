import React, { useState, useEffect } from "react";

const MovieDetails = props => {
  //   let movieID = props.match.params;
  const [movieID, setMovieID] = useState(props.match.params["id"]);
  const [movieDetails, setMovieDetails] = useState([]);


  useEffect(() => {
    fetchMovieDetails();
  }, []);

  async function fetchMovieDetails() {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setMovieDetails(res));

  }
  return (
    <div className="movieDetails">
      {console.log(movieDetails)}
      <div className="movieDetails__backdrop">
        <img
          src={
            "https://image.tmdb.org/t/p/original/" +
            movieDetails["backdrop_path"]
          }
        />
        <h2>{movieDetails["original_title"]}</h2>
      </div>
        <p>{movieDetails["overview"]}</p>
    </div>
  );
};

export default MovieDetails;
