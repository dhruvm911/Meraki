import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";

export default function SignUpForm() {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/google";
  };

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role: userType,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate(userType === "student" ? "/login" : "/loginTwo");
      } else {
        setErrorMessage(
          data.errors
            ? data.errors.map(error => error.msg).join(", ")
            : data.message || "An error occurred during registration."
        );
      }
    } catch (error) {
      setErrorMessage("Failed to register. Please try again.");
    }
  };

  return (
    <section className="min-h-screen pt-24 bg-dark text-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center min-h-full">
        
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full max-w-md"
            alt="Sample"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6"> 
            
            {/* Social Sign Up */}
            <div className="flex flex-col items-center mb-4">
              <p className="text-lg mb-2">Sign up with</p>
              <div className="flex gap-2">
                <TERipple rippleColor="light">
                  <button type="button" className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {/* Facebook icon SVG */}
                  </button>
                </TERipple>
                <TERipple rippleColor="light">
                  <button type="button" className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                    {/* Twitter icon SVG */}
                  </button>
                </TERipple>
                <TERipple rippleColor="light">
                  <button type="button" className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white">
                    {/* LinkedIn icon SVG */}
                  </button>
                </TERipple>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-4">
              <div className="flex-1 border-t border-neutral-600"></div>
              <p className="px-4 text-center font-semibold">Or</p>
              <div className="flex-1 border-t border-neutral-600"></div>
            </div>

            {/* Input Fields */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName} onChange={(e) => setFullName(e.target.value)}
              size="lg"
              className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email} onChange={(e) => setEmail(e.target.value)}
              size="lg"
              className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />

            <input
              type="password"
              placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              size="lg"
              className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              size="lg"
              className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />

            {/* User Type Selection */}
            <div>
              <p className="text-lg mb-2">Sign up as:</p>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={userType === "student"}
                    onChange={() => setUserType("student")}
                    className="form-radio text-primary"
                  />
                  <span className="ml-2">Student</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="instructor"
                    checked={userType === "instructor"}
                    onChange={() => setUserType("instructor")}
                    className="form-radio text-primary"
                  />
                  <span className="ml-2">Instructor</span>
                </label>
              </div>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* Sign Up Button */}
            <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
              Sign up
            </button>

            {/* Google Login Button */}
            <div className="flex justify-center">
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="mt-2 h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white"
                  onClick={handleGoogleLogin}
                >
                  G
                </button>
              </TERipple>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
