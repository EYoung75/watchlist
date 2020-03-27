import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaChevronCircleLeft, FaAngleRight } from "react-icons/fa";

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

  let history = useHistory();

  return (
    <div className="showDetails">
      <div className="showDetails__backdrop">
        <button className="showDetails__backdrop__backButton" onClick={() => history.goBack()}>
          <FaChevronCircleLeft />
        </button>
        <img
          src={
            "https://image.tmdb.org/t/p/original/" +
            showDetails["backdrop_path"]
          }
          alt={showDetails["name"]}
        />
        <div className="showDetails__backdrop__banner">
          <h2>{showDetails["name"]}</h2>
        </div>
      </div>
      <div className="showDetails__overview">
        <div className="showDetails__map">
          {showDetails["networks"] != null || undefined
            ? showDetails["networks"].map(show => {
                return (
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original/" + show["logo_path"]
                    }
                    alt={show.name}
                    key={show}
                  />
                );
              })
            : ""}
        </div>
        <h3><u>Tags:</u></h3>

        <div className="showDetails__map">
          {showDetails["genres"] != null || undefined
            ? showDetails["genres"].map(show => {
                return <p key={show.id}>|{show.name}</p>;
              })
            : ""}
        </div>

        <h3>Overview:</h3>
        <p>{showDetails["overview"]}</p>
        <h3>
          First Aired:{" "}
          {showDetails["first_air_date"] != undefined
            ? showDetails["first_air_date"].slice(0, 4)
            : ""}
        </h3>
        <p>
          {showDetails["in_production"] == true ? "Still running" : "Finished"}
        </p>
        <p>
          {showDetails["number_of_seasons"] +
            " season(s) | " +
            showDetails["number_of_episodes"] +
            " episodes"}
        </p>
        <p>
          {"Episode runtimes: " +
            showDetails["episode_run_time"] +
            " min/episode(s)"}
        </p>
        <h3>Available Seasons: </h3>
        <div className="showDetails__seasons">
          {showDetails["seasons"] != null || undefined
            ? showDetails["seasons"].map(season => (
                <Link
                  to={`/show/${showDetails["id"]}/season/${season["season_number"]}`}
                  className="showDetails__seasons__season"
                  key={season["id"]}
                >
                  <p>{season.name}</p>
                  <h5>
                    <FaAngleRight />
                  </h5>
                </Link>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
