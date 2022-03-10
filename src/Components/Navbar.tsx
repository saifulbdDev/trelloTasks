import React from "react";
import logo from "../img/logo.png";
const Navbar = () => {
  return (
    <header className="header">
      <div className="left-aligned">
        <div className="button">Home</div>
        <div className="button">Boards</div>
        <div className="button">Search bar</div>
      </div>
      <div className="logo ">
        <img src={logo} alt="logo" width="40" />
      </div>
      <div className="right-aligned">
        <div className="button">Add</div>
        <div className="button">Info</div>
        <div className="button">Bell</div>
        <div className="button">Gear</div>
        <div className="button">Avatar</div>
      </div>
    </header>
  );
};

export default Navbar;
