import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaCode,
  FaLock,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import logo from "../assets/logo_no_bg.png"
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="px-4 divide-y bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link
          to="/"
          className="flex items-center  text-2xl font-bold text-gray-800 dark:text-white"
        >
          <img className="w-20 h-20" src={logo} alt="Logo" />
          <span>
            Serve
            <span className="text-purple-600 dark:text-pink-400">Now</span>
          </span>
        </Link>
        </div>

        <div className="grid grid-cols-2 text-sm gap-x-4 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="uppercase font-semibold">Product</h3>
            <ul className="space-y-1">
              <li><a href="#">Features</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="uppercase font-semibold">Company</h3>
            <ul className="space-y-1">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="uppercase font-semibold">Developers</h3>
            <ul className="space-y-1">
              <li><a href="#">Public API</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Guides</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="uppercase font-semibold">Social Media</h3>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full hover:bg-violet-600 hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-violet-600 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-violet-600 hover:text-white transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 text-sm text-center border-t border-gray-300 dark:border-gray-700">
        © 2025 ServeNow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
