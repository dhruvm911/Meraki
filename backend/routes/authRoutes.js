// authRoutes.js
import express from 'express';
import passport from 'passport';
import { registerUser, loginUser } from '../controllers/userController.js';
import { validateRegister } from "../middleware/validateRegister.js";
import { validateLogin } from "../middleware/validateLogin.js";
import jwt from "jsonwebtoken";


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Route to register a user
router.post('/register', validateRegister, registerUser);

// Route to login a user
router.post('/login', validateLogin, loginUser);

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login', // Redirect if authentication fails
}), (req, res) => {
    // Successful authentication, redirect to your desired route
    const token = jwt.sign(
        { id: req.user.id, role: req.user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
    );
    res.status(200).json({ message: 'Login successful', token });
    // res.redirect('/'); // Change to your main app route
});

// Facebook Auth Routes
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// router.get('/facebook/callback', passport.authenticate('facebook', {
//     failureRedirect: '/login',
// }), (req, res) => {
//     res.redirect('/'); // Change to your main app route
// });

export default router;
