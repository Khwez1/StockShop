import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/UseAuth";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} width="200px" alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-dark-blue">
              Search
            </Link>
          </div>
        </div>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-dark-blue">Welcome, {user?.userName}</div>
            <a
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-light-green hover:opacity-70"
            >
              Logout
            </a>
          </div>
        ):(
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-dark-blue">Login</Link>
            <Link
              to="/register"
              className="px-8 py-3 font-bold rounded text-white bg-light-green hover:opacity-70"
            >
              Signup
            </Link>
          </div>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
