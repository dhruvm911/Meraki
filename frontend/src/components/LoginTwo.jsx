import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { useAuth } from "./AuthContext";

const LoginTwo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { refreshUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Handle successful login, such as storing token or redirecting
        console.log("Login successful:", data);

        const token = data.token; // Make sure 'data.token' matches the actual response key
        if (token) {
          localStorage.setItem("authToken", token);
          await refreshUser();
          console.log("Token saved to localStorage:", token);
        }

        navigate("/home");
      } else {
        // Show error message if login failed
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };
  return (
    <section className="min-h-screen pt-24 bg-dark text-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center min-h-full">
        
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="w-full max-w-md"
            alt="Sample"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
          <form onSubmit={handleLogin} className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md">
            
            {/* Social Login */}
            <div className="flex flex-row items-center justify-center lg:justify-start mb-6">
              <p className="mr-4 text-lg">Sign in with</p>
              <TERipple rippleColor="light">
                <button type="button" className="mx-1 h-9 w-9 rounded-full bg-red-600 flex items-center justify-center text-white">
                  {/* Google Logo */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c-5.528 0-10 4.472-10 10s4.472 10 10 10 10-4.472 10-10-4.472-10-10-10zm2.186 12.708h-2.186v2.793h-2.793v-2.793h-2.793v-2.793h2.793v-2.793h2.793v2.793h2.186l.932 2.793h-3.118v2.793z" />
                  </svg>
                </button>
              </TERipple>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-neutral-600"></div>
              <p className="px-4 text-center font-semibold">Or</p>
              <div className="flex-1 border-t border-neutral-600"></div>
            </div>

            {/* Input Fields */}
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Email address"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              />
            </div>

            <div className="relative mb-6">
              <input
                type="password"
                placeholder="Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 mb-4">
                {errorMessage}
              </div>
            )}

            {/* Sign In Button */}
            <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
              Sign in
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm">Don't have an account? <a href="/signup" class="text-sm text-blue-500 -200 hover:underline mt-4">Sign up</a></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginTwo;
