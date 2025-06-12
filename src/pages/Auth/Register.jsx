import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import GoogleLogin from "../../components/GoogleLogin";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (!hasUppercase || !hasLowercase) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must include both uppercase and lowercase letters.",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          Swal.fire("Success!", "Account created successfully", "success");
          form.reset();
          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire("Error!", error.message, "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  px-4">
      <div className="w-full max-w-md p-8 space-y-6  rounded-2xl shadow-lg my-6">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Create Account
        </h2>
        <p className="text-center text-sm ">
          Join us and explore more!
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium "
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium "
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
              htmlFor="photo"
              className="block mb-1 text-sm font-medium "
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Enter your photo URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium "
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
            <div className="mt-1">
              <input
                type="checkbox"
                id="togglePassword"
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="togglePassword" className="text-sm text-gray-600">
                Show Password
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600  font-semibold rounded-md cursor-pointer hover:bg-purple-700 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-center gap-3">
          <div className="w-full h-px "></div>
          <p className="text-sm ">OR</p>
          <div className="w-full h-px "></div>
        </div>

        {/* Google Login Button */}
        <GoogleLogin />

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
