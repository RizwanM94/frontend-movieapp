import React, { useState } from "react";
import axios from "axios"; // Import axios
//import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  console.log("signup ")
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To handle errors
  const [loading, setLoading] = useState(false); // To show loading state

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    debugger
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true); // Show loading state
      const response = await axios.post('http://localhost:5000/api/user/signup', {
        email,
        password,
      });
      debugger

      alert("Signup successful!");

      // If the signup is successful, redirect to the login page or another page
      // navigate('/signIn');

    } catch (error) {
      // Handle errors from the API
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#093545] py-10 ">
        <div className="bg-[#093545] p-10 rounded-lg  w-full max-w-md">
          <h2 className="text-4xl text-white font-semibold text-center mb-6">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#224957] text-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#224957] text-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-400 mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#224957] text-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-300">
            Already have an account?{" "}
            <a href="/signin" className="text-green-400 hover:underline">
              Sign in
            </a>
          </p>

        </div>

      </div>
      
    </>
  );
};

export default SignUp;
