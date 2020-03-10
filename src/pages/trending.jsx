import React, { useState, useEffect } from "react";
import ShowCard from "../components/showCard.jsx";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import { FaStar } from "react-icons/fa";

const Trending = () => {
  const [hasErrors, setErrors] = useState(false);
  const [trending, setTrending] = useState([]);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetchTrending();
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex =
      trendingIndex === trending.length - 1 ? 0 : trendingIndex + 1;
    setTrendingIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      trendingIndex === 0 ? trending.length - 1 : trendingIndex - 1;
    setTrendingIndex(nextIndex);
  };

  async function fetchTrending() {
    await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key="
    )
      .then(res => res.json())
      .then(res => setTrending(res["results"]))
      .catch(() => setErrors(true));
  }

  const slides = trending.map(item => {
    console.log(item);
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item["name"]}
        className="carousel__item"
      >
        <img
          src={"https://image.tmdb.org/t/p/original/" + item["poster_path"]}
        />
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
        activeIndex={trendingIndex}
        next={next}
        previous={previous}
        className="trending__carousel"
      >
        <CarouselIndicators items={trending} activeIndex={trendingIndex} />
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

export default Trending;
