import React, { useState, useEffect } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieDetails = props => {
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
        <Link to="/" className="movieDetails__backdrop__backButton">
          <FaArrowAltCircleLeft />
        </Link>
        <img
          src={
            "https://image.tmdb.org/t/p/original/" +
            movieDetails["backdrop_path"]
          }
        />
        <div className="movieDetails__backdrop__banner">
          <h2>{movieDetails["original_title"]}</h2>
        </div>
      </div>
      <div className="movieDetails__overview">
        <div className="movieDetails__overview__date">
          <p>{movieDetails["release_date"]}</p>
          <p>{"Runtime: " + movieDetails["runtime"] + " minutes"}</p>
        </div>
        <p>{JSON.stringify(movieDetails["genres"])}</p>
        <h3>Synopsis:</h3>
        <p>{movieDetails["overview"]}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
