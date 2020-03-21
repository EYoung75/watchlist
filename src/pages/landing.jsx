import React, {useState, useEffect} from "react";
import TrendingTV from "../components/TVCarousel.jsx";
import MovieCarousel from "../components/MovieCarousel.jsx";
import TVCarousel from "../components/TVCarousel.jsx";

function Landing() {
  const movies = [
    { title: "Top Rated", url: "https://api.themoviedb.org/3/movie/top_rated" },
    {
      title: "Trending",
      url: "https://api.themoviedb.org/3/trending/movie/day"
    },
    {
      title: "Now Playing",
      url: "https://api.themoviedb.org/3/movie/now_playing"
    },
    { title: "Popular", url: "https://api.themoviedb.org/3/movie/popular" }
  ];

  const tvs = [
    { title: "Trending", url: "https://api.themoviedb.org/3/trending/tv/day" },
    { title: "Popular", url: "https://api.themoviedb.org/3/tv/popular" },
    { title: "Top Rated", url: "https://api.themoviedb.org/3/tv/top_rated" }
  ];

  const [search, setSearch] = useState("")

  async function handleSearch(term) {
    console.log(search)
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${term}`
    )
      .then(res => res.json())
      .then(res => console.log(res));
  }

  return (
    <div className="landing">
      {/* <Navbar className="navbar"/> */}
      <div>
        <label for="search">Search:</label>
        <input id="search" onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={handleSearch(search)}>Go</button>
      </div>
      <h2 className="landing__heading">TV:</h2>
      <div className="landing__contentContainer">
        {tvs.map(tv => (
          <TVCarousel tv={tv} />
        ))}
      </div>
      <h2 className="landing__heading">Movies:</h2>
      <div className="landing__contentContainer">
        {movies.map(movie => (
          <MovieCarousel movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Landing;
