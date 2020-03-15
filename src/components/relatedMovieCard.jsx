import React from "react";

const RelatedMovieCard = props => {
  return (
    <div className="relatedMovie">
      <img
        src={"https://image.tmdb.org/t/p/original/" + props.title.poster_path}
        alt={props.title.title}
      />
      <div className="relatedMovie__banner">
        <h4>{props.title.title}</h4>
      </div>
    </div>
  );
};

export default RelatedMovieCard;
