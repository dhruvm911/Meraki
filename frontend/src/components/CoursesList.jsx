import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CoursesList = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 9; // Display 9 courses per page

    useEffect(() => {
        // Fetch courses from the backend
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
                const response = await fetch('http://localhost:5000/api/v1/course', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in the Authorization header
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setCourses(data.courses);
                    setTotalPages(Math.ceil(data.courses.length / itemsPerPage)); // Calculate total pages
                } else {
                    console.error(data.message || 'Error fetching courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    // Get the courses to display on the current page
    const getCurrentPageCourses = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return courses.slice(startIndex, startIndex + itemsPerPage);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">All Courses</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentPageCourses().map((course) => (
                    <div
                        key={course._id}
                        className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-gray-700 mb-4">
                            {course.description.slice(0, 100)}...
                        </p>
                        <p className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm mb-2">
                            {course.category}
                        </p>
                        <p className="text-sm text-gray-600">
                            Created by: <span className="font-semibold">{course.instructor?.fullName || 'Unknown'}</span>
                        </p>
                        <Link
                            to={`/courses/${course._id}`}
                            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoursesList;