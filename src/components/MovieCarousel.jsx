import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from "reactstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieCarousel = (props) => {
  const [hasErrors, setErrors] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesIndex, setMoviesIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex =
      moviesIndex === movies.length - 1
        ? 0
        : moviesIndex + 1;
    setMoviesIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      moviesIndex === 0
        ? movies.length - 1
        : moviesIndex - 1;
    setMoviesIndex(nextIndex);
  };

  async function fetchTrendingMovies() {
    await fetch(
      `${props.movie.url}?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(res => setMovies(res["results"]))
      .catch(() => setErrors(true));
  }

  const slides = movies.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item["title"]}
        className="carousel__item"
      >
        <Link to={`/movie/${item["id"]}`}>
          <img
          alt={item["title"]}
            src={"https://image.tmdb.org/t/p/original/" + item["poster_path"]}
          />
        </Link>
        {/* <button className="trending__carousel__item__button">Details</button> */}
        <div className="carousel__item__badge">
          <FaStar className="carousel__item__badge__icon" />
          <p>{item["vote_average"]}</p>
        </div>
        <h3>{item["title"]}</h3>
      </CarouselItem>
    );
  });

  return (
    <div className="carousel">
      <h2>{props.movie.title + ":"}</h2>
      <Carousel
        interval={8000}
        activeIndex={moviesIndex}
        next={next}
        previous={previous}
      >
        {/* <CarouselIndicators
          items={trendingMovies}
          activeIndex={trendingMoviesIndex}
          className="carousel__indicators"
        /> */}
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
