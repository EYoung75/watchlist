import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="header">
      <Link to="/" className="header__logo">WatchList</Link>
      <div className="header__mobile">
        Menu
      </div>
    </div>
  );
};

export default Header;
