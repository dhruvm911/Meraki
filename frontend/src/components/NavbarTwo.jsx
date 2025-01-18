import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Assuming the user data (e.g., profile picture, name) is available in context or props
const NavbarTwo = ({ user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/dashboard");
    };

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="bg-zinc-900 p-4 shadow-lg">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo Section */}
                <Link to="/home" className="text-white text-2xl font-semibold">
                <svg width="192" height="41" viewBox="0 0 192 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto max-lg:h-6"><g clip-path="url(#clip0_221_195)">
        <path d="M25.8086 36.4585H22.9233L42.3991 3.41675H48.7956V39.7701H42.3991V12.5629L43.8736 12.9519L27.909 39.7701H20.8866L4.92199 13.0675L6.4495 12.6155V39.7701H0V3.41675H6.4495L25.8086 36.4585Z" 
        fill="currentColor"></path><path d="M80.2561 30.5714H86.3131C86.0055 32.4742 85.2629 34.1668 84.0749 35.6491C82.8868 37.1314 81.2744 38.2878 79.2377 39.1288C77.2011 39.9699 74.7613 40.3904 71.9396 40.3904C68.7361 40.3904 65.8614 39.8016 63.3367 38.6242C60.8121 37.4468 58.8285 35.7752 57.3964 33.5991C55.9644 31.4334 55.243 28.8473 55.243 25.8616C55.243 22.876 55.9432 20.3319 57.3328 18.1242C58.733 15.9165 60.6636 14.2134 63.1352 13.015C65.6068 11.8165 68.4603 11.2173 71.7062 11.2173C74.9522 11.2173 77.8693 11.806 80.1076 12.9834C82.3564 14.1609 84.0218 15.9165 85.1144 18.2609C86.207 20.5947 86.6632 23.5383 86.4722 27.0916H61.6289C61.8198 28.6581 62.3396 30.0773 63.1882 31.3283C64.0369 32.5793 65.1931 33.557 66.6676 34.2404C68.142 34.9342 69.8605 35.2811 71.8229 35.2811C74.0081 35.2811 75.8539 34.8501 77.339 33.9881C78.824 33.126 79.7999 31.9906 80.2561 30.5714ZM71.5365 16.2634C68.9695 16.2634 66.8585 16.8942 65.1931 18.1452C63.5277 19.3963 62.4563 20.9942 61.9683 22.9391H80.1394C79.9909 20.847 79.1423 19.207 77.5935 18.0296C76.0448 16.8522 74.0293 16.2634 71.5365 16.2634Z" fill="currentColor"></path><path d="M92.0842 11.827H98.364V39.7596H92.0842V11.827ZM108.558 17.157C106.522 17.157 104.771 17.588 103.318 18.4501C101.865 19.3121 100.708 20.3529 99.8385 21.5934C98.9686 22.8234 98.364 24.0219 98.0246 25.1888L97.9715 22.0455C98.0139 21.6355 98.1412 21.0047 98.364 20.1637C98.5868 19.3227 98.9368 18.3975 99.4142 17.3883C99.8809 16.3791 100.528 15.4014 101.334 14.4447C102.14 13.488 103.148 12.7206 104.336 12.1214C105.524 11.5221 106.935 11.2278 108.558 11.2278V17.178V17.157Z" fill="currentColor"></path><path d="M124.748 40.3798C122.181 40.3798 119.837 39.7596 117.704 38.5296C115.572 37.2996 113.875 35.586 112.613 33.3993C111.35 31.2127 110.714 28.7001 110.714 25.8511C110.714 23.0022 111.35 20.3845 112.634 18.1978C113.918 16.0111 115.657 14.2975 117.842 13.0675C120.028 11.8375 122.489 11.2173 125.204 11.2173C128.227 11.2173 130.614 11.8691 132.396 13.1832C134.168 14.4973 135.43 16.2529 136.194 18.4606C136.947 20.6683 137.329 23.1388 137.329 25.8616C137.329 27.3965 137.106 29.0155 136.65 30.7186C136.194 32.4216 135.494 33.9986 134.528 35.4598C133.563 36.9211 132.28 38.1091 130.678 39.0237C129.076 39.9383 127.103 40.4009 124.759 40.4009L124.748 40.3798ZM126.679 35.2286C128.79 35.2286 130.593 34.8291 132.089 34.0196C133.574 33.2206 134.709 32.1063 135.483 30.687C136.257 29.2678 136.639 27.6593 136.639 25.8616C136.639 23.8852 136.247 22.1822 135.451 20.784C134.656 19.3857 133.531 18.2924 132.057 17.5355C130.582 16.7681 128.79 16.3896 126.679 16.3896C123.655 16.3896 121.322 17.2727 119.656 19.0283C117.991 20.784 117.163 23.0652 117.163 25.8722C117.163 27.7014 117.567 29.3309 118.383 30.7501C119.19 32.1693 120.314 33.2732 121.757 34.0616C123.189 34.8501 124.833 35.2391 126.679 35.2391V35.2286ZM136.639 11.827H142.983V39.7596H137.095C136.947 38.3404 136.83 37.1104 136.756 36.0801C136.682 35.0498 136.639 34.0722 136.639 33.1365V11.8165V11.827Z" fill="currentColor"></path><path d="M150.447 0.609863H156.727V39.7596H150.447V0.609863ZM178.685 11.827L162.89 26.1876L163.06 22.2558L179.873 39.7596H171.833L156.886 24.106L169.966 11.8165H178.685V11.827Z" fill="currentColor"></path><path d="M191.256 0V6.00282H183.725V0H191.256ZM184.298 11.8269H190.641V39.7595H184.298V11.8269Z" fill="currentColor"></path></g></svg>
        </Link>
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <input
                        type="text"
                        className="py-2 px-4 pl-10 rounded-full text-gray-800 placeholder-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search for courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                        <i className="fa fa-search"></i>
                    </button>
                </form>

                {/* Navbar Links */}
                <div className="flex items-center space-x-6">
                    {/* Instructor button */}
                    <Link to="/instructor" className="text-white text-xl hover:text-gray-200">
                        <i className="fa fa-chalkboard-user"></i>
                    </Link>
                    {/* Cart Button */}
                    <Link to="/cart" className="text-white text-xl hover:text-gray-200">
                        <i className="fa fa-shopping-cart"></i>
                    </Link>

                    {/* My Courses Button */}
                    <Link to="/my-courses" className="text-white text-xl hover:text-gray-200">
                        <i className="fa fa-book"></i>
                    </Link>

                    {/* User Profile Button */}
                    <div className="relative">
                        <div onClick={handleProfileClick} className="cursor-pointer">
                            {user?.profilePhoto ? (
                                <img
                                    src={user.profilePhoto}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                                />
                            ) : (
                                <i className="fa fa-user-circle text-white text-2xl"></i>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarTwo;
