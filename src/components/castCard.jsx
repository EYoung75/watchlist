import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

const CastCard = props => {
  const slides = props.cast.map(item => {
    console.log(item);
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item["name"]}
        className="castCard__item"
      >
        <img
          src={"https://image.tmdb.org/t/p/original/" + item.profile_path}
          alt={item.name}
        />
        <h4>{item.name}</h4>
        <h5>As: {item.character}</h5>
      </CarouselItem>
    );
  });
  const [castIndex, setCastIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = castIndex === props.cast.length - 1 ? 0 : castIndex + 1;
    setCastIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = castIndex === 0 ? props.cast.length - 1 : castIndex - 1;
    setCastIndex(nextIndex);
  };

  return (
    <div className="castCard">
      <h3>Cast:</h3>
      <Carousel
        interval={8000}
        activeIndex={castIndex}
        next={next}
        previous={previous}
      >
        {/* <CarouselIndicators items={trendingTV} activeIndex={castIndex} className="carousel__indicators"/> */}
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

export default CastCard;
