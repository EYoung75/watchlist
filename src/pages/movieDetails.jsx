import React, { useState, useEffect } from "react";
import { FaChevronCircleLeft, FaStar, FaAngleDown } from "react-icons/fa";

import { Link } from "react-router-dom";
import RelatedMovieCard from "../components/relatedMovieCard.jsx";
import CastCard from "../components/castCard.jsx";
import Review from "../components/review.jsx";
import MovieCarousel from "../components/MovieCarousel.jsx";

const MovieDetails = props => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [reviewsModal, setReviewsModal] = useState(false);
  const toggleReviews = () => setReviewsModal(!reviewsModal);


  useEffect(() => {
    fetchMovieDetails(props.match.params["id"]);
  }, []);

  async function fetchMovieDetails(id) {
    // const baseUrl=""
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setMovieDetails(res));
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setMovieTrailer(res.results[0]));
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setRelatedMovies(res.results));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setMovieReviews(res.results));
  }



  return (
    <div className="movieDetails">
      {console.log(relatedMovies)}
      <div className="movieDetails__backdrop">
        <Link to="/" className="movieDetails__backdrop__backButton">
          <FaChevronCircleLeft />
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
          <p>
            {movieDetails["release_date"] != undefined
              ? movieDetails["release_date"].slice(0, 4)
              : ""}
          </p>
          <p>{movieDetails["runtime"] + " min."}</p>
        </div>
        <p>{movieDetails["tagline"]}</p>
        <div className="movieDetails__map">
          {movieDetails["genres"] != null || undefined
            ? movieDetails["genres"].map(movie => {
                return <p>| {movie.name}</p>;
              })
            : ""}
        </div>{" "}
        <div className="movieDetails__overview__vote">
          <div className="movieDetails__overview__vote__average">
            <FaStar className="movieDetails__overview__vote__star" />
            <p>{movieDetails["vote_average"] + "/10"}</p>
          </div>
          <p>{"(" + movieDetails["vote_count"] + ")"}</p>
        </div>
        <div className="movieDetails__overview__synopsis">
          <h3>Synopsis:</h3>
          <p>{movieDetails["overview"]}</p>
        </div>
        {movieTrailer != undefined ? (
          <iframe
            className="movieDetails__overview__trailer"
            src={`https://www.${movieTrailer.site}.com/embed/${movieTrailer.key}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        ) : (
          ""
        )}
        <CastCard movie={props.match.params["id"]} />
        <div className="movieDetails__reviews">
          <h3>Reviews:</h3>
          <FaAngleDown onClick={() => toggleReviews()} className={reviewsModal ? "movieDetails__reviews__arrow movieDetails__reviews__arrow--expanded" : "movieDetails__reviews__arrow"}/>
          {reviewsModal == false ? "" : <Review reviews={movieReviews} />}
        </div>
        <div className="movieDetails__related">
          <h3>Related Movies:</h3>
          {/* <MovieCarousel movie={relatedMovies}/> */}
          {relatedMovies.map(title => (
            <RelatedMovieCard title={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
