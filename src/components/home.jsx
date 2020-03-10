import React, { useState, useEffect } from "react";

const Home = () => {
  const [hasErrors, setErrors] = useState(false);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      const res = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?api_key="
      )
        .then(res => res.json())
        .then(res => setTrending(res))
        .catch(() => setErrors(true));
    }
    fetchTrending();
  }, []);

  return <div>{JSON.stringify(trending)}</div>;
};

export default Home;
