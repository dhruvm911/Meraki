import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MyCourseDetail = () => {
    const { courseId } = useParams(); // Extract courseId from the URL
    const [course, setCourse] = useState(null);
    const [lectures, setLectures] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                if (response.ok) {
                    setCourse(data.course);
                } else {
                    setError(data.message || 'Error fetching course details');
                }
            } catch (err) {
                setError('Something went wrong while fetching course details');
            }
        };

        const fetchLectures = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:5000/api/v1/lecture/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                const data = await response.json();
                console.log(data.lectures);
                if (response.ok) {
                    // Group lectures by upload date
                    const groupedLectures = data.lectures.reduce((acc, lecture) => {
                        const date = new Date(lecture.createdAt).toLocaleDateString();
                        acc[date] = acc[date] ? [...acc[date], lecture] : [lecture];
                        return acc;
                    }, {});
                    setLectures(groupedLectures);
                } else {
                    setError(data.message || 'Error fetching lectures');
                }
            } catch (err) {
                setError('Something went wrong while fetching lectures');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
        fetchLectures();
    }, [courseId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            {course ? (
                <>
                    <div className="mb-6">
                        {course.thumbnail && (
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                        )}
                        <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                        <p className="text-lg mb-2">{course.description}</p>
                        <p className="text-sm text-gray-600 mb-2">
                            Instructor: <span className="font-semibold">{course.instructor?.fullName || 'Unknown'}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Category: <span className="font-semibold">{course.category}</span>
                        </p>
                    </div>

                    {/* Course Content */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                        {Object.keys(lectures).length > 0 ? (
                            <div>
                                {Object.keys(lectures)
                                    .sort((a, b) => new Date(a) - new Date(b)) // Sort dates in ascending order
                                    .map((date) => (
                                        <details key={date} className="mb-4">
                                            <summary className="cursor-pointer text-gray-600 bg-blue-200 p-2 rounded">
                                                {date}
                                            </summary>
                                            <ul className="mt-2">
                                                {lectures[date].map((lecture) => (
                                                    <li key={lecture._id} className="mb-2">
                                                        <p className="font-semibold">{lecture.title}</p>
                                                        <p className="text-sm text-gray-600">{lecture.description}</p>
                                                        {lecture.url && (
                                                            <a
                                                                href={lecture.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-500 hover:underline text-sm"
                                                            >
                                                                Download
                                                            </a>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    ))}
                            </div>
                        ) : (
                            <p>No lectures available</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Course not found</p>
            )}
        </div>
    );
};

export default MyCourseDetail;
