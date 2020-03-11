import React, { useEffect } from "react";
import Trending from "../pages/trending.jsx";
import TrendingMovies from "../components/trendMovies";

function Landing() {
    return (
        <div className="landing__container">
        {/* <Navbar className="navbar"/> */}
        <Trending />
        <TrendingMovies/>
      </div>
    )
}

export default Landing;