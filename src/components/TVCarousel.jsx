import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";
import { FaStar } from "react-icons/fa";

const TrendingTV = props => {
  const [hasErrors, setErrors] = useState(false);
  const [TV, setTrendingTV] = useState([]);
  const [TVIndex, setTVIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetchTrendingTV();
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex = TVIndex === TV.length - 1 ? 0 : TVIndex + 1;
    setTVIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = TVIndex === 0 ? TV.length - 1 : TVIndex - 1;
    setTVIndex(nextIndex);
  };

  async function fetchTrendingTV() {
    await fetch(`${props.tv.url}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(res => setTrendingTV(res["results"]))
      .catch(() => setErrors(true));
  }

  const slides = TV.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item["name"]}
        className="carousel__item"
      >
        <Link to={`/show/${item["id"]}`}>
          <img
            alt={item["name"]}
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
    <div className="carousel">
      <h2>{props.tv.title + ":"}</h2>
      <Carousel
        interval={8000}
        activeIndex={TVIndex}
        next={next}
        previous={previous}
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
