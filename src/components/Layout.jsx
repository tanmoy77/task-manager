import React from "react";
import Navbar from "./nav/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container relative">{children}</div>
    </div>
  );
};

export default Layout;
