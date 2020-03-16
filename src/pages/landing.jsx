import React from "react";
import TrendingTV from "../components/trendingTV.jsx";
import MovieCarousel from "../components/MovieCarousel.jsx";

function Landing() {
  const movies = [
    { title: "Top Rated", url: "https://api.themoviedb.org/3/movie/top_rated" },
    {title: "Trending", url: "https://api.themoviedb.org/3/trending/movie/day"},
    {title: "Now Playing", url: "https://api.themoviedb.org/3/movie/now_playing"},
    {title: "Popular", url: "https://api.themoviedb.org/3/movie/popular"}
  ];

  return (
    <div className="landing">
      {/* <Navbar className="navbar"/> */}
      <TrendingTV />
      {movies.map((movie) => <MovieCarousel movie={movie}/>)}
    </div>
  );
}

export default Landing;
