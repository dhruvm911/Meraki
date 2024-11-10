import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    role: '',
    profilePhoto: '',
    bio: '',
    skills: [],
  });
  const navigate = useNavigate();

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get token from localStorage
        if (!token) {
          navigate('/login'); // Redirect to login if token is missing
          return;
        }

        const response = await axios.get('http://localhost:5000/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        setUser(response.data.user); // Set user data from API response
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    setUser(null);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src={user.profilePhoto || '../../ProjectImg/pp.jpg'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* User Information */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{user.fullName || 'John Doe'}</h2>
          <p className="text-sm text-gray-600">{user.email || 'johndoe@example.com'}</p>
          <p className="text-sm text-gray-600">{user.role || 'Student'}</p>
        </div>

        {/* Skills Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
          <ul className="list-disc list-inside text-gray-600">
            {user.skills.length > 0 ? (
              user.skills.map((skill, index) => <li key={index}>{skill}</li>)
            ) : (
              <li>No skills added yet.</li>
            )}
          </ul>
        </div>

        {/* Bio Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Bio</h3>
          <p className="text-gray-600">{user.bio || 'No bio available.'}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate('/edit-profile')} // Navigate to Edit Profile page
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
