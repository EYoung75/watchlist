import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ShowDetails = props => {
  const [showDetails, setShowDetails] = useState([]);

  useEffect(() => {
    fetchShowDetails(props.match.params["id"]);
  }, []);

  async function fetchShowDetails(id) {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => setShowDetails(res));
  }

  return (
    <div className="showDetails">
      <div className="showDetails__backdrop">
        <Link to="/" className="showDetails__backdrop__backButton">
          <FaArrowAltCircleLeft />
        </Link>
        <img
          src={
            "https://image.tmdb.org/t/p/original/" +
            showDetails["backdrop_path"]
          }
        />
        <div className="showDetails__backdrop__banner">
          <h2>{showDetails["name"]}</h2>
        </div>
      </div>
      <div className="showDetails__overview">
        <h3>First Aired: {showDetails["first_air_date"]}</h3>
        <p>
          {showDetails["in_production"] == true ? "Still running" : "Finished"}
        </p>
        <p>{showDetails["number_of_seasons"] + " seasons | " + showDetails["number_of_episodes"] + " episodes"}</p>
        <p>{"Episode runtimes: " + showDetails["episode_run_time"] + " min/episode(s)"}</p>
        <h3>Overview:</h3>
        <p>{showDetails["overview"]}</p>
        <h3>Available Seasons: </h3>
          
      </div>
    </div>
  );
};

export default ShowDetails;
