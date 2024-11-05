import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
export default function SignUpForm() {
  const [userType, setUserType] = useState("student");

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
          <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm"> {/* Reduced max width */}
            
            {/* Social Sign Up */}
            <div className="flex flex-row items-center justify-center lg:justify-start mb-4">
              <p className="mr-4 text-lg">Sign up with</p>
              <TERipple rippleColor="light">
                <button type="button" className="mx-1 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {/* Add SVG for Facebook icon here */}
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button type="button" className="mx-1 h-8 w-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
                  {/* Add SVG for Twitter icon here */}
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button type="button" className="mx-1 h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center text-white">
                  {/* Add SVG for LinkedIn icon here */}
                </button>
              </TERipple>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-neutral-600"></div>
              <p className="px-4 text-center font-semibold">Or</p>
              <div className="flex-1 border-t border-neutral-600"></div>
            </div>

            {/* Input Fields */}
            <div className="relative mb-4">
              <TEInput
                type="text"
                placeholder="Username"
                size="lg"
                className="bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-800"
              />
            </div>

            <div className="relative mb-4">
              <TEInput
                type="email"
                placeholder="Email address"
                size="lg"
                className="bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-800"
              />
            </div>

            <div className="relative mb-4">
              <TEInput
                type="password"
                placeholder="Password"
                size="lg"
                className="bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-800"
              />
            </div>

            <div className="relative mb-4">
              <TEInput
                type="password"
                placeholder="Confirm Password"
                size="lg"
                className="bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-800"
              />
            </div>

            {/* User Type Selection */}
            <div className="mb-4">
              <p className="text-lg mb-2">Sign up as:</p>
              <div className="flex items-center space-x-4">
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

            {/* Sign Up Button */}
            <button type="submit" className="w-full py-2 mb-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold">
              Sign up
            </button>

            {/* Login Link */}
           
          </form>
        </div>
      </div>
    </section>
  );
}
