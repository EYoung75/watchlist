import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";
import { FaStar } from "react-icons/fa";

const TrendingTV = () => {
  const [hasErrors, setErrors] = useState(false);
  const [trendingTV, setTrendingTV] = useState([]);
  const [trendingTVIndex, setTrendingTVIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetchTrendingTV();
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex =
      trendingTVIndex === trendingTV.length - 1 ? 0 : trendingTVIndex + 1;
    setTrendingTVIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      trendingTVIndex === 0 ? trendingTV.length - 1 : trendingTVIndex - 1;
    setTrendingTVIndex(nextIndex);
  };

  async function fetchTrendingTV() {
    await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(res => setTrendingTV(res["results"]))
      .catch(() => setErrors(true));
  }

  const slides = trendingTV.map(item => {
    console.log(item);
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item["name"]}
        className="carousel__item"
      >
        <Link to={`/show/${item["id"]}`}>
          <img
            src={"https://image.tmdb.org/t/p/original/" + item["poster_path"]}
          />
        </Link>
        {/* <button className="trending__carousel__item__button">Details</button> */}
        <div className="carousel__item__badge">
          <FaStar className="carousel__item__badge__icon" />
          <p>{item["vote_average"]}</p>
        </div>
        <h3>{item["name"]}</h3>
      </CarouselItem>
    );
  });

  return (
    <div className="trending">
      <h2>Trending Shows:</h2>
      <Carousel
        interval={8000}
        activeIndex={trendingTVIndex}
        next={next}
        previous={previous}
        className="carousel"
      >
        {/* <CarouselIndicators items={trendingTV} activeIndex={trendingTVIndex} className="carousel__indicators"/> */}
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

export default TrendingTV;
