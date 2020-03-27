import React from "react";
import MovieCarousel from "../components/MovieCarousel.jsx";
import TVCarousel from "../components/TVCarousel.jsx";

function Landing() {
  const movies = [
    {title: "Trending",url: "https://api.themoviedb.org/3/trending/movie/day"},
    { title: "Popular", url: "https://api.themoviedb.org/3/movie/popular" },
    { title: "Top Rated", url: "https://api.themoviedb.org/3/movie/top_rated" }
  ];

  const tvs = [
    { title: "Trending", url: "https://api.themoviedb.org/3/trending/tv/day" },
    { title: "Popular", url: "https://api.themoviedb.org/3/tv/popular" },
    { title: "Top Rated", url: "https://api.themoviedb.org/3/tv/top_rated" }
  ];

  return (
    <div className="landing">
      {/* <Navbar className="navbar"/> */}

      <h2 className="landing__heading">TV:</h2>
      <div className="landing__contentContainer">
        {tvs.map(tv => (
          <TVCarousel tv={tv} key={tv.title}/>
        ))}
      </div>
      <h2 className="landing__heading">Movies:</h2>
      <div className="landing__contentContainer">
        {movies.map(movie => (
          <MovieCarousel movie={movie} key={movie.title}/>
        ))}
      </div>
    </div>
  );
}

export default Landing;
