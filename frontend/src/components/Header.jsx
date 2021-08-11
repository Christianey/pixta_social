import { Link } from "react-router-dom";
import React from "react";

import NavSearch from "./navSearch.jsx";
import NavMenu from "./navMenu.jsx";

const Header = () => {
  return (
    <header className="sticky h-16 bg-white border-b  border-gray-100 px-5 py-2">
      <div
        className="header-wrapper flex justify-between mx-auto"
        style={{ maxWidth: "780px" }}
      >
        <div className="w-40 mt-2">
          <Link to="/home">
            <h1>
              <img src="/logo.png" alt="header-logo" className="w-full" />
            </h1>
          </Link>
        </div>

        <NavSearch />

        <NavMenu />
      </div>
    </header>
  );
};

export default Header;
