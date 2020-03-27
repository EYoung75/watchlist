import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
      .then(res => setEpisodes(res));
  }

  let history = useHistory();
  return <div className="seasonDetails">
      {JSON.stringify(episodes)}
  </div>;
}

export default SeasonDetails;
