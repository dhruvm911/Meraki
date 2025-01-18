import React, { useState } from 'react';
import axios from 'axios';
import NavbarThree from './NavbarThree';
const CreateCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
    });
    const [thumbnail,setThumbnail] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setThumbnail(e.target.files[0]); // Save the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const token = localStorage.getItem('authToken'); // Assuming you use a token stored in localStorage
            console.log(token);
            const config = {
                headers: {
                    
                    Authorization: `Bearer ${token}`, // Pass token for authentication
                },
            };

            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            if (thumbnail) {
                formDataToSend.append('thumbnail', thumbnail); // Append the file
            }

            const response = await axios.post(
                'http://localhost:5000/api/v1/course/create',
                formDataToSend,
                config
            );

            setSuccessMessage(response.data.message);
            setFormData({ title: '', description: '', category: '', price: '' }); // Reset the form
            setThumbnail(null);
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <>
        <NavbarThree />
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-900 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold mb-8 text-center text-orange-400">Create a New Course</h1>
    
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
    
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">Course Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white bg-gray-800 placeholder-gray-500"
                    placeholder="Enter course title"
                    required
                />
            </div>
    
            <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white bg-gray-800 placeholder-gray-500"
                    rows="5"
                    placeholder="Enter course description"
                    required
                ></textarea>
            </div>
    
            <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white bg-gray-800 placeholder-gray-500"
                    placeholder="Enter course category"
                    required
                />
            </div>
    
            <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">Price (in INR)</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white bg-gray-800 placeholder-gray-500"
                    placeholder="Enter course price"
                    required
                    min="0"
                />
            </div>
    
            <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">Thumbnail</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-5 py-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white bg-gray-800"
                    required
                />
            </div>
    
            <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-500"
            >
                Create Course
            </button>
        </form>
    </div>
    </>
    );
};

export default CreateCourse;
