import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the created courses from the backend
        const fetchCreatedCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/user/created-courses', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.createdCourses); // Assuming the response contains 'createdCourses'
                } else {
                    const data = await response.json();
                    setError(data.message || 'Error fetching courses');
                }
            } catch (error) {
                setError('An error occurred while fetching courses');
                console.error('Error fetching courses:', error);
            }
        };

        fetchCreatedCourses();
    }, []);

    const truncateDescription = (description, length = 100) => {
        if (description.length > length) {
            return description.substring(0, length) + '...';
        }
        return description;
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">My Created Courses</h2>
            
            {/* Display error message if exists */}
            {error && <div className="text-red-500">{error}</div>}

            {/* Display all the courses in a card format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length === 0 ? (
                    <p>No courses found</p>
                ) : (
                    courses.map((course) => (
                        <div key={course._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                            {course.thumbnail && (
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                        )}
                            <h3 className="text-xl font-semibold text-blue-600">{course.title}</h3>
                            <p className="text-gray-700 mt-2">{truncateDescription(course.description)}</p>

                            {/* Category with grey background */}
                            <div className="mt-2 py-1 px-3 inline-block bg-gray-200 text-gray-700 text-sm rounded-md">
                                {course.category}
                            </div>

                            {/* Price */}
                            <div className="mt-3 font-semibold text-gray-900 text-lg">{`₹${course.price}`}</div>

                            {/* View more button (optional) */}
                            <button
                                onClick={() => navigate(`/course/${course._id}`)}
                                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                View Details
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CreatedCourses;
