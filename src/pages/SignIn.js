import React, { useState } from "react";
import axios from "axios"; // Import axios
//import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
;

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setErrorMessage("Email and password are required.");
            return;
        }

        try {
            setLoading(true); // Show loading spinner or disabled button
            const response = await axios.post('http://localhost:5000/api/user/signin', {
                email,
                password,
            });

            console.log(response.data); 
            
           
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert("Sign-in successful!");

                
                navigate('/home');
            } else {
                setErrorMessage("No token received. Please check your credentials.");
            }

        } catch (error) {
           
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
            } else {
                setErrorMessage("Something went wrong. Please check your connection and try again.");
            }
        } finally {
            setLoading(false); 
        }
    };

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-[#093545]">
      <div className="bg-[#093545] p-10 rounded-lg w-full max-w-md">
        <h2 className="text-4xl text-white font-semibold text-center mb-6">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#224957] text-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="email"
              required
            />
          </div>
          <div className="mb-4">
            
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#224957] text-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-green-500"
              />
              <span className="ml-2 text-gray-300 text-align:center">Remember me</span>
            </label>
          </div>
          <button
            type="submit"
            //onClick={() => navigate('/home')}
            className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-300">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
     
    </div>
  
    </>
  );
};

export default SignIn;
