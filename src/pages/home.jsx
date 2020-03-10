import React, { useState, useEffect } from "react";
import ShowCard from "../components/showCard.jsx";

const Home = () => {
  const [hasErrors, setErrors] = useState(false);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  async function fetchTrending() {
    await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key="
    )
      .then(res => res.json())
      .then(res => setTrending(res["results"]))
      .catch(() => setErrors(true));
  }


  return (
    <div className="home">
      {trending.map((show) => 
        <ShowCard {...show}/>
      )}
    </div>
  );
};

export default Home;
