import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QJgARE3PErr7tLYOvI654XExVXDS4xhBCjpc8gxyOepMww5FRezApT0Xw7GIZ0Z0MgyAZXQiyiqXQNch51a4MUm002DLbqDRP');

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch cart items when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('User is not authenticated');
                navigate('/login'); // Redirect to login if not authenticated
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/v1/cart', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const cart = response.data || {};
                setCartItems(cart.items || []);
                setTotalAmount(cart.totalAmount || 0);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [navigate]);

    // Handle removing a course from the cart
    const handleRemoveCourse = async (courseId) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('User is not authenticated');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/cart/remove/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(response.data.message);
            setCartItems(cartItems.filter(item => item._id !== courseId));
            setTotalAmount(totalAmount - response.data.removedCoursePrice);
        } catch (error) {
            console.error('Error removing course:', error);
        }
    };

    // Handle proceeding to payment
    const handleProceedToPay = async () => {
        if (cartItems.length === 0 || totalAmount <= 0) {
            alert('Your cart is empty. Please add items before proceeding to payment.');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID is missing');
            navigate('/login'); // Redirect to login
            return;
        }

        setIsLoading(true);

        try {
            const cartItemsData = cartItems.map(item => ({
                _id: item._id,
                title: item.title,
                description: item.description,
                price: item.price,
            }));

            const { data } = await axios.post('http://localhost:5000/api/v1/payment/create-checkout-session', {
                cartItems: cartItemsData,
                totalAmount,
                userId,
            });

            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

            if (error) {
                console.error('Error redirecting to Stripe Checkout:', error);
            }
        } catch (error) {
            console.error('Error initiating payment process:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const takeMeHome = () => {
        navigate('/home');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {isLoading ? (
                <div className="text-center">
                    <p className="text-gray-600">Processing payment, please wait...</p>
                </div>
            ) : cartItems.length === 0 ? (
                <div className="text-center text-gray-600">
                    <h2 className="text-xl font-semibold">Your cart is empty!</h2>
                    <p className="text-gray-500">Add something and come back.</p>
                    <button
                        onClick={takeMeHome}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Home
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map(course => (
                            <div key={course._id} className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl text-black font-semibold">{course.title}</h2>
                                    <p className="text-gray-600">
                                        {course.description.length > 100
                                            ? `${course.description.substring(0, 100)}...`
                                            : course.description}
                                    </p>
                                    <p className="text-gray-500">Instructor: {course.instructor.fullName}</p>
                                    <p className="text-gray-700 font-bold">₹{course.price}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveCourse(course._id)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 text-black bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">Total Amount: ₹{totalAmount}</h2>
                        <button
                            onClick={handleProceedToPay}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                        >
                            Proceed to Pay
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
