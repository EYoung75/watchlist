import React from "react";

function NavBar() {
  return (
    <div className="navbar">
      <h2>Browse</h2>
      <div>
        <ul>
          <li>Now Playing</li>
          <li>Upcoming</li>
          <li>Trending</li>
          <li>Top Rated</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
