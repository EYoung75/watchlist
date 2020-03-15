import React, { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import RelatedMovieCard from "../components/relatedMovieCard.jsx";
import CastCard from "../components/castCard.jsx";

const MovieDetails = props => {
  const [movieID, setMovieID] = useState(props.match.params["id"]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [reviewsModal, setReviewsModal] = useState(false);

  
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  async function fetchMovieDetails() {
    // const baseUrl=""
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setMovieDetails(res));
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setMovieTrailer(res.results[0]));
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setRelatedMovies(res.results));
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setMovieCast(res.cast));
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setMovieReviews(res.results));
  }

  return (
    <div className="movieDetails">
      {console.log(relatedMovies)}
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
        <p>{movieDetails["tagline"]}</p>
        {JSON.stringify(movieDetails.genres)}
        <div className="movieDetails__overview__vote">
          <FaStar />
          <p>{movieDetails["vote_average"]}</p>
          <p>{"(" + movieDetails["vote_count"] + ")"}</p>
        </div>
        <div className="movieDetails__overview__date">
          <p>{movieDetails["release_date"]}</p>
          <p>{"Runtime: " + movieDetails["runtime"] + " minutes"}</p>
        </div>
        {/* <p>{JSON.stringify(movieDetails["genres"])}</p> */}

        <div className="movieDetails__overview__synopsis">
          <h3>Synopsis:</h3>
          <p>{movieDetails["overview"]}</p>
        </div>
        <iframe
          className="movieDetails__overview__trailer"
          src={`https://www.${movieTrailer.site}.com/embed/${movieTrailer.key}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <CastCard cast={movieCast} />
        <div className="movieDetails__reviews">
          <h3>Reviews:</h3>
          {movieReviews.map(review => (
            <div className="movieDetails__reviews__review">
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
        <div className="movieDetails__related">
          <h3>Related Movies:</h3>
          {relatedMovies.map(title => (
            <RelatedMovieCard title={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
