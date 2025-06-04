import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import "react-tooltip/dist/react-tooltip.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
      <div className="px-4 py-4 mx-auto max-w-screen-xl flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          Serve<span className="text-purple-600 dark:text-pink-400">Now</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/posts" className={navLinkClass}>
            All Posts
          </NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/add-post" className={navLinkClass}>
                Add Post
              </NavLink>
            </>
          )}
        </nav>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-xl"
            data-tooltip-id="navbar-tooltip"
            data-tooltip-content={theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-700"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-1 bg-pink-500 rounded hover:bg-pink-600"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div
              className="relative group"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <img
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                data-tooltip-id="navbar-tooltip"
                data-tooltip-content={user.displayName || "User"}
              />
              {hover && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-xl p-4 z-50">
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">
                    {user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    <FiLogOut className="inline mr-2" /> Logout
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
            className="text-2xl"
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
            <NavLink to="/posts" className={navLinkClass}>
              All Posts
            </NavLink>
            {user && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/add-post" className={navLinkClass}>
                  Add Post
                </NavLink>
              </>
            )}
            {!user && (
              <>
                <NavLink to="/login" className="text-black dark:text-white">
                  Login
                </NavLink>
                <NavLink to="/register" className="text-black dark:text-white">
                  Register
                </NavLink>
              </>
            )}
          </ul>

          <div className="flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="text-xl text-black dark:text-white"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>

            {user && (
              <div
                className="relative"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                  referrerPolicy="no-referrer"
                />
                {hover && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-md z-50 p-3">
                    <p className="text-sm font-semibold mb-1">
                      {user.displayName}
                    </p>
                    <p className="text-xs mb-2">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm hover:text-red-600"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
