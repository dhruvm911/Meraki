import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetail = () => {
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const { id } = useParams();  // Getting course ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the course details by ID
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/course/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCourse(data.course); // Set the course details
                } else {
                    const data = await response.json();
                    setError(data.message || 'Error fetching course details');
                }
            } catch (error) {
                setError('An error occurred while fetching course details');
                console.error('Error fetching course details:', error);
            }
        };




        const fetchUnreadCount = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/chat/${id}/unread-message`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUnreadCount(data.length); // Number of unread messages
                } else {
                    console.error('Failed to fetch unread messages count');
                }
            } catch (error) {
                console.error('Error fetching unread messages:', error);
            }
        };

        fetchCourseDetails();
        fetchUnreadCount();
    }, [id]);

    // Handle delete course
    const handleDeleteCourse = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this course?');
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/course/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (response.ok) {
                    alert('Course deleted successfully');
                    navigate('/created-course');  // Redirect to created courses page
                } else {
                    const data = await response.json();
                    alert(data.message || 'Error deleting course');
                }
            } catch (error) {
                console.error('Error deleting course:', error);
                alert('An error occurred while deleting the course');
            }
        }
    };

    // Handle edit course
    const handleEditCourse = () => {
        navigate(`/edit-course/${id}`);  // Navigate to edit course page
    };

    // Handle add video
    const handleAddVideo = () => {
        navigate(`/add-video/${id}`);  // Navigate to add video page
    };

    // Handle add assignment
    const handleAddAssignment = () => {
        navigate(`/add-assignment/${id}`);  // Navigate to add assignment page
    };

    // Handle view enrolled students
    const handleEnrolledStudents = () => {
        navigate(`/enrolled-students/${id}`);  // Navigate to enrolled students page
    };

    const handleChatNavigation = () => {
        const targetRoute = unreadCount > 0 ? `/unread-messages/${id}` : `/all-chats/${id}`;
        navigate(targetRoute);
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">{course.title}</h2>

            <div className="flex space-x-6 mb-6">
                {/* Buttons section */}
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={handleDeleteCourse}
                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                    >
                        Delete Course
                    </button>
                    <button
                        onClick={handleEditCourse}
                        className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
                    >
                        Edit Course
                    </button>
                    <button
                        onClick={handleAddVideo}
                        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
                    >
                        Add Video
                    </button>
                    <button
                        onClick={handleAddAssignment}
                        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add Assignment
                    </button>
                    <button
                        onClick={handleEnrolledStudents}
                        className="py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Enrolled Students
                    </button>
                </div>

                {/* Course details section */}
                <div className="flex-1">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-gray-700">{course.description}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Category</h3>
                        <p className="text-gray-600">{course.category}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Price</h3>
                        <p className="text-gray-600">₹{course.price}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Created By</h3>
                        <p className="text-gray-600">{course.instructor.fullName}</p>
                    </div>
                </div>
            </div>
            {/* Floating Orange Button */}
            <div className="fixed bottom-4 right-4">
                <button
                    onClick={handleChatNavigation}
                    className="bg-orange-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-orange-700"
                >
                    {unreadCount > 0 ? `Unread Messages (${unreadCount})` : 'Messages'}
                </button>
            </div>
        </div>

    );
};

export default CourseDetail;
