import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;
