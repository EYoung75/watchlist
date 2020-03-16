import React from "react";
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

  return (
    <div className="landing">
      {/* <Navbar className="navbar"/> */}
      <h2>TV:</h2>
      {tvs.map(tv => (
        <TVCarousel tv={tv} />
      ))}
      <h2>Movies::</h2>
      {movies.map(movie => (
        <MovieCarousel movie={movie} />
      ))}
    </div>
  );
}

export default Landing;
