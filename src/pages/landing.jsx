import React from "react";
import TrendingTV from "../components/trendingTV.jsx";
import TrendingMovies from "../components/trendingMovies";

function Landing() {

    return (
        <div className="landing">
        {/* <Navbar className="navbar"/> */}
        <TrendingTV />
        <TrendingMovies/>
      </div>
    )
}

export default Landing;