import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";

function SeasonDetails(props) {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchSeasonDetails(props.match.params["season"]);
  }, []);

  async function fetchSeasonDetails(season) {
    fetch(
      `https://api.themoviedb.org/3/tv/63247/season/${season}?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(res => setEpisodes(res.episodes));
  }

  let history = useHistory();
  return (
    <div className="seasonDetails">
      {console.log(episodes)}
      <div className="seasonDetails__header">
        <FaChevronCircleLeft
          className="seasonDetails__header__backButton"
          onClick={() => {
            setEpisodes([]);
            history.goBack();
          }}
        />
        <h2>{"Season " + props.match.params["season"]}</h2>
      </div>
      <div className="seasonDetails__seasons">
        {episodes != null || undefined
          ? episodes.map(episode => (
              <div className="seasonDetails__seasons__seasonCard">
                <h3>{episode.episode_number + ") " + episode.name}</h3>
                <p>{episode.overview}</p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default SeasonDetails;
