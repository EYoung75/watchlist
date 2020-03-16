import React, { useState, useEffect } from "react";

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
      .then(res => setShowDetails(res))
  }
  return <div className="showDetails">
       <img
            src={"https://image.tmdb.org/t/p/original/" + showDetails["backdrop_path"]}
          />
        <h1>{showDetails["name"]}</h1>
        {console.log(JSON.stringify(showDetails))}
      </div>;
};

export default ShowDetails;
