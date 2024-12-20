import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetails = () => {
    const { courseId } = useParams(); // Extract courseId from the URL params
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:5000/api/v1/course/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data.course);
                if (response.ok) {
                    setCourse(data.course);
                } else {
                    setError(data.message || 'Error fetching course details');
                }
            } catch (err) {
                setError('Something went wrong while fetching course details');
            } finally {
                setLoading(false); // Set loading to false after data is fetched or error occurs
            }
        };

        const fetchCourseReviews = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:5000/api/v1/review/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setReviews(data.reviews);
                } else {
                    setError(data.message || 'Error fetching reviews');
                }
            } catch (err) {
                setError('Something went wrong while fetching reviews');
            }
        };

        // Fetch both course details and reviews
        fetchCourseDetails();
        fetchCourseReviews();
    }, [courseId]);

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        
            // Step 1: Fetch the user's enrolled courses
            const enrolledCoursesResponse = await fetch(`http://localhost:5000/api/v1/user/enrolled-courses`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            const enrolledCoursesData = await enrolledCoursesResponse.json();
            console.log(enrolledCoursesData);
    
            // Step 2: Check if the course is already enrolled
            const enrolledCourses = enrolledCoursesData.enrolledCourses || [];
            const isCourseEnrolled = enrolledCourses.some(course => course._id === courseId);
    
            if (isCourseEnrolled) {
                // Course is already enrolled, show alert
                alert("You are already enrolled in this course!");
                return;  // Prevent further action
            }
    
            // Step 3: Fetch current cart items to check if course is already added
            const cartResponse = await fetch('http://localhost:5000/api/v1/cart', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            const cartData = await cartResponse.json();
    
            // Step 4: Check if the course is already in the cart
            const isCourseInCart = cartData.items.some(item => item._id === courseId);
    
            if (isCourseInCart) {
                // Course is already in the cart, navigate to home
                alert("Course is already in your cart!");
                navigate('/home');
            } else {
                // Step 5: If the course is not in the cart, proceed with adding it
                const response = await fetch(`http://localhost:5000/api/v1/cart/add/${courseId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                const data = await response.json();
                console.log(data);
    
                if (response.ok) {
                    setMessage(data.message); // Display success message
                    alert("Course added to cart!");
                    navigate("/home");
                } else {
                    setMessage(data.message); // Display error message
                }
            }
        } catch (err) {
            setMessage('Error adding course to cart');
            console.error(err);
        }
    };
    
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            {course ? (
                <>
                    {course.thumbnail && (
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                        )}
                    <h2 className="text-3xl font-bold mb-6">{course.title}</h2>
                    <p className="text-lg mb-4">{course.description}</p>
                    <p className="text-sm text-gray-600 mb-2">
                        Category: <span className="font-semibold">{course.category}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                        Price: <span className="font-semibold">₹{course.price}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                        Instructor: <span className="font-semibold">{course.instructor?.fullName || 'Unknown'}</span>
                    </p>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
                        {reviews.length > 0 ? (
                            <div>
                                {reviews.map((review) => (
                                    <div key={review._id} className="border-b mb-4 pb-4">
                                        <p className="text-sm font-semibold">{review.student?.fullName}</p>
                                        <p className="text-gray-600">{review.comment}</p>
                                        <p className="text-sm text-yellow-500">
                                            Rating: {review.rating} / 5
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No reviews yet</p>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                    >
                        Add to Cart
                    </button>
                </>
            ) : (
                <p>Course not found</p>
            )}
        </div>
    );
};

export default CourseDetails;
