import { Cart } from '../models/cartSchema.js';
import { Course } from '../models/courseSchema.js';

export const addToCart = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user.id;

    try {
        // Fetch course to get price details
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find or create the student's cart
        let cart = await Cart.findOne({ student: studentId });
        if (!cart) {
            cart = new Cart({
                student: studentId,
                items: [courseId],
                totalAmount: course.price,
            });
        } else {
            // Check if course is already in the cart
            if (cart.items.includes(courseId)) {
                return res.status(400).json({ message: 'Course already in cart' });
            }

            // Add course to cart items and update totalAmount
            cart.items.push(courseId);
            cart.totalAmount += course.price;
        }

        await cart.save();
        res.status(200).json({ message: 'Course added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding course to cart', error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user.id;

    try {
        // Fetch course to get price details
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find the student's cart
        const cart = await Cart.findOne({ student: studentId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the course is in the cart
        const courseIndex = cart.items.indexOf(courseId);
        if (courseIndex === -1) {
            return res.status(400).json({ message: 'Course not found in cart' });
        }

        // Remove the course from items and update totalAmount
        cart.items.splice(courseIndex, 1);
        cart.totalAmount -= course.price;

        await cart.save();
        res.status(200).json({ message: 'Course removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing course from cart', error: error.message });
    }
};

export const getCartItems = async (req, res) => {
    const studentId = req.user.id;

    try {
        // Find the student's cart and populate course details for items
        const cart = await Cart.findOne({ student: studentId }).populate('items');
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ items: cart.items, totalAmount: cart.totalAmount });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart items', error: error.message });
    }
};

//checkout controller to be implemented later to handle payment gateway