import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar.jsx";

function Header() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="header">
      <div className="header__menu">
        <Link to="/" className="header__logo">
          WatchList
        </Link>
        <button onClick={toggleNavbar}>Menu</button>
      </div>
      <SearchBar collapsed={collapsed}/>
    </div>
  );
}

export default Header;
