import { Link } from "react-router-dom";
import React from "react";

import NavSearch from "./navSearch.jsx";
import NavMenu from "./navMenu.jsx";

const Header = () => {
  return (
    <header className="sticky h-20 md:h-16 bg-white border-b  border-gray-100 md:px-5 py-2">
      <div
        className="header-wrapper flex justify-between mx-auto flex-col justi md:flex-row"
        style={{ maxWidth: "780px" }}
      >
        <div className="w-24 md:w-40 mt-2 self-center">
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
