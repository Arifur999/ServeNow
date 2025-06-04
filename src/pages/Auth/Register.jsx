import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import GoogleLogin from "../../components/GoogleLogin";

const Register = () => {
  const {createUser}=use(AuthContext)
const handleRegister=e=>{
  e.preventDefault();
  const form =e.target;
  const name=form.name.value;
  const email=form.email.value;
  const password=form.password.value;
  createUser(email,password)
  .then(result=>{
    console.log(result);
  })
  .catch(error=>{
    console.log(error);
  })
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500">
          Join us and explore more!
        </p>

        <form 
        onSubmit={handleRegister}
        className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

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
              placeholder="Enter your Email"
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
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md cursor-pointer hover:bg-purple-700 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-center gap-3">
          <div className="w-full h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <GoogleLogin></GoogleLogin>

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
