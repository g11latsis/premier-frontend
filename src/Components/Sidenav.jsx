import React from "react";
import logo from "../assets/pl-logo.png";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="h-full w-64 fixed top-0 left-0 bg-pl-purple p-4 flex flex-col gap-12 items-center">
      <div>
        <img src={logo} alt="logo" width={150} height={150} />
      </div>
      <nav className="flex flex-col space-y-4 w-full text-lg">
        <Link
          to="/"
          className="text-pl-white text-2xl font-semibold font-header hover:text-pl-light-purple"
        >
          Home
        </Link>
        <Link
          to="/teams"
          className="text-pl-white text-2xl font-semibold font-header hover:text-pl-light-purple"
        >
          Teams
        </Link>
        <Link
          to="/players"
          className="text-pl-white text-2xl font-semibold font-header hover:text-pl-light-purple"
        >
          Players
        </Link>
        <Link
          to="/coaches"
          className="text-pl-white text-2xl font-semibold font-header hover:text-pl-light-purple"
        >
          Coaches
        </Link>
        <Link
          to="/stadiums"
          className="text-pl-white text-2xl font-semibold font-header hover:text-pl-light-purple"
        >
          Stadiums
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
