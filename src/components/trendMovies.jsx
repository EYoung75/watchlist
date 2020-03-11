import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const TrendingMovies = () => {
  const [hasErrors, setErrors] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMoviesIndex, setTrendingMoviesIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex =
      trendingMoviesIndex === trendingMovies.length - 1
        ? 0
        : trendingMoviesIndex + 1;
    setTrendingMoviesIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      trendingMoviesIndex === 0
        ? trendingMovies.length - 1
        : trendingMoviesIndex - 1;
    setTrendingMoviesIndex(nextIndex);
  };

  async function fetchTrendingMovies() {
    await fetch(
      "https://api.themoviedb.org/3/trending/movies/week?api_key="
    )
      .then(res => res.json())
      .then(res => setTrendingMovies(res["results"]))
      .catch(() => setErrors(true));
  }

  const slides = trendingMovies.map(item => {
    console.log(item);
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item["title"]}
        className="carousel__item"
      >
        <Link to={`/movie/${item["id"]}`}>
          <img
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
    <div className="trending">
      <h2>Trending Movies:</h2>
      <Carousel
        interval={8000}
        activeIndex={trendingMoviesIndex}
        next={next}
        previous={previous}
        className="carousel"
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

export default TrendingMovies;
