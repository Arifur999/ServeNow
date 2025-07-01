import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import "react-tooltip/dist/react-tooltip.css";
import logo from "/logo_no_bg.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged out!", "", "success");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout Error:", err);
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-pink-500 font-bold border-b-2 border-pink-500"
      : "text-gray-200 dark:text-white hover:text-pink-400";

  return (
    <header className="bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-900 sticky top-0 z-50 shadow-md">
      <Tooltip id="navbar-tooltip" place="bottom" className="z-50" />
      <div className="px-4 py-3 mx-auto max-w-screen-xl flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-white"
        >
          <img className="w-20 h-20" src={logo} alt="Logo" />
          <span>
            Serve
            <span className="text-purple-300 dark:text-pink-400">Now</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/all-post" className={navLinkClass}>
            All Posts
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact Us
          </NavLink>
          <NavLink to="/faq" className={navLinkClass}>
            FAQ
          </NavLink>
        </nav>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-4 relative">
          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />

            {/* Sun Icon */}
            <svg
              className="swap-off fill-current w-6 h-6 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4V2M12 22v-2M4.22 4.22l-1.42 1.42M19.78 19.78l-1.42-1.42M2 12H4m16 0h2M4.22 19.78l1.42-1.42M19.78 4.22l-1.42 1.42M12 8a4 4 0 100 8 4 4 0 000-8z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Moon Icon */}
            <svg
              className="swap-on fill-current w-6 h-6 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-700 text-white"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-1 bg-pink-500 rounded hover:bg-pink-600 text-white"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-2 relative">
              <img
                src={user?.photoURL}
                alt="profile"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border-2 border-white"
                data-tooltip-id="navbar-tooltip"
                data-tooltip-content={user.displayName || "User"}
              />
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <BiDotsVerticalRounded className="text-white text-2xl" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-56 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-xl p-4 z-50">
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">
                    {user.email}
                  </p>
                  <NavLink
                    to="/my-post"
                    className="block w-full text-center mb-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    My Post
                  </NavLink>
                  <NavLink
                    to="/my-request"
                    className="block w-full text-center mb-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    My Requests
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <FiLogOut className="inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 px-4 py-4 z-50">
          <ul className="flex flex-col space-y-4 mb-4">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/all-post" className={navLinkClass}>
              All Posts
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
            <NavLink to="/faq" className={navLinkClass}>
              FAQ
            </NavLink>

            {!user ? (
              <>
                <NavLink to="/login" className="text-black dark:text-white">
                  Login
                </NavLink>
                <NavLink to="/register" className="text-black dark:text-white">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/my-post" className="text-black dark:text-white">
                  My Post
                </NavLink>
                <NavLink to="/my-request" className="text-black dark:text-white">
                  My Requests
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-600 dark:text-red-400 flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
