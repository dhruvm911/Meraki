import React from "react";
import { TEInput, TERipple } from "tw-elements-react";

export default function LoginForm() {
  return (
    <section className="min-h-screen pt-24 bg-dark text-white">
      {/* Added `pt-24` for extra spacing from navbar */}
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
        <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
          <form className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md">
            
            {/* Social Login */}
            <div className="flex flex-row items-center justify-center lg:justify-start mb-6">
              <p className="mr-4 text-lg">Sign in with</p>
              <TERipple rippleColor="light">
                <button type="button" className="mx-1 h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {/* Add SVG for Facebook icon here */}
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button type="button" className="mx-1 h-9 w-9 rounded-full bg-blue-400 flex items-center justify-center text-white">
                  {/* Add SVG for Twitter icon here */}
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button type="button" className="mx-1 h-9 w-9 rounded-full bg-blue-800 flex items-center justify-center text-white">
                  {/* Add SVG for LinkedIn icon here */}
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
              <TEInput
                type="email"
                placeholder="Email address"
                size="lg"
                className="bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-800"
              />
            </div>

            <div className="relative mb-6">
              <TEInput
                type="password"
                placeholder="Password"
                size="lg"
                className="bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-800"
              />
            </div>

            {/* Sign In Button */}
            <button type="submit" className="w-full py-3 mb-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold">
              Sign in
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm">Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
