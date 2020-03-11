import React from "react";
import "./main.scss";
import Header from "./components/header.jsx";
import Navbar from "./components/navbar.jsx";
import Trending from "./pages/trending.jsx";
import TrendingMovies from "./components/trendMovies";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="landing__container">
        {/* <Navbar className="navbar"/> */}
        <Trending />
        <TrendingMovies/>
      </div>
    </div>
  );
}

export default App;
