import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ShowDetails = props => {
  const [showID, setShowID] = useState(props.match.params["id"]);
  const [showDetails, setShowDetails] = useState([]);

  useEffect(() => {
    fetchShowDetails();
  }, []);

  async function fetchShowDetails() {
    fetch(
      `https://api.themoviedb.org/3/tv/${showID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
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
        <h1>{showDetails["name"]}</h1>
      </div>
      <div className="showDetails__intial">
        <h3>First Aired: {showDetails["first_air_date"]}</h3>
        <p>
          {showDetails["in_production"] == true ? "Still running" : "Finished"}
        </p>
        <p>{showDetails["number_of_seasons"] + " seasons"}</p>
        <p>{showDetails["number_of_episodes"] + " episodes"}</p>
        <h3>Overview:</h3>
        <p>{showDetails["overview"]}</p>
      </div>
    </div>
  );
};

export default ShowDetails;
