import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

function Header() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const [search, setSearch] = useState("");

  return (
    <div className="header">
      <div className="header__menu">
        <Link to="/" className="header__logo">
          WatchList
        </Link>
        <button
          onClick={toggleNavbar}
          className={
            collapsed ? "header__button" : "header__button--up header__button"
          }
        >
          <FaAngleDown />
        </button>
      </div>
      <div className={collapsed ? "header__collapsed" : "header__searchBar"}>
        <input
          id="search"
          onChange={e => setSearch(e.target.value)}
          placeholder="Search movies and shows"
        />
        <Link
          to={`/search/${search}`}
          className="header__searchBar__button"
          onClick={() => toggleNavbar()}
        >
          Search
        </Link>
      </div>
    </div>
  );
}

export default Header;
