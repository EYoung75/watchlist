import React from "react";

const ShowCard = props => {
  return (
    <div className="showcard">
      {console.log(props)}
      <img src={"https://image.tmdb.org/t/p/original/" + props["poster_path"]} alt={props["name"] + "poster"}/>
      <h2>{props["name"]}</h2>
      <p>{props["overview"]}</p>
    </div>
  );
};


export default ShowCard;
