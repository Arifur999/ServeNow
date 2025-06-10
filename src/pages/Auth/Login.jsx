import React, { useContext, useState } from "react";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import GoogleLogin from "../../components/GoogleLogin";
import Swal from "sweetalert2";

const Login = () => {
  const { signinUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signinUser(email, password)
      .then((result) => {
        form.reset();
        Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Welcome Back!
        </h2>
        <p className="text-center text-sm text-gray-500">Sign in to continue</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <div className="flex justify-between items-center mt-2 text-sm">
              <div>
                <input
                  type="checkbox"
                  id="togglePassword"
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="togglePassword" className="text-gray-600">
                  Show Password
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-purple-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center gap-3">
          <div className="w-full h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center gap-4">
          <GoogleLogin />
        </div>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
