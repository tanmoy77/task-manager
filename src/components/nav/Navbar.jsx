import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          {/* <img alt="logo" src={logo} /> */}
          <h2 className="logo">Task Manager</h2>
        </Link>
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;
