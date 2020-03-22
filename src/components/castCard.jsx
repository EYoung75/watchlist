import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

function CastCard(props) {
  const [cast, setCast] = useState([]);


  useEffect(() => {
    fetchCast(props.movie);
  }, []);

  async function fetchCast(id) {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setCast(res.cast));
  }
  const slides = cast.map(item => {
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
    const nextIndex = castIndex === cast.length - 1 ? 0 : castIndex + 1;
    setCastIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = castIndex === 0 ? cast.length - 1 : castIndex - 1;
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
