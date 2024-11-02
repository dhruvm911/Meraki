import { Course } from "../models/courseSchema";
import { User } from "../models/userSchema";
import { validationResult } from "express-validator";

export const createCourse = async (req, res) => {
    // Validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, price } = req.body;

    try {
        // Create a new course instance
        const newCourse = new Course({
            title,
            description,
            instructor: req.user._id, // Associate with the logged-in user
            category,
            price,
        });

        // Save the course to the database
        await newCourse.save();

        // Send a response back to the client
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        // Retrieve all courses from the database
        const courses = await Course.find().populate('instructor', 'fullName email'); // Populating instructor details

        // Send the courses back to the client
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses', error: error.message });
    }
};

export const getCourseById = async (req, res) => {
    const { id } = req.params; // Extract the course ID from request parameters

    try {
        // Retrieve the course by ID
        const course = await Course.findById(id).populate('instructor', 'fullName email'); // Populating instructor details

        // Check if the course exists
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Send the course back to the client
        res.status(200).json({ course });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving course', error: error.message });
    }
};

export const updateCourse = async (req, res) => {
    const { id } = req.params; // Extract the course ID from request parameters

    try {
        // Find the course by ID and update only the provided fields
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        // Check if the course exists
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Send the updated course back to the client
        res.status(200).json({ course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params; // Extract the course ID from request parameters

    try {
        // Find the course by ID and remove it
        const deletedCourse = await Course.findByIdAndDelete(id);

        // Check if the course exists
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Send a success message
        res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
};

export const enrollInCourse = async (req, res) => {
    const { courseId } = req.params; // Extract the course ID from request parameters
    const userId = req.user.id; // Get the logged-in user's ID from the request object

    try {
        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is already enrolled
        const user = await User.findById(userId);
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: 'User already enrolled in this course' });
        }

        // Enroll the user in the course
        user.enrolledCourses.push(courseId);
        await user.save();

        // Optionally, you can also keep track of the course's enrolled students (if required)
        course.enrolledStudents.push(userId);
        await course.save();

        // Send a success response
        res.status(200).json({ message: 'Successfully enrolled in the course', course });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling in course', error: error.message });
    }
};

export const getEnrolledStudents = async (req, res) => {
    const { courseId } = req.params; // Extract the course ID from request parameters

    try {
        // Find the course by ID
        const course = await Course.findById(courseId).populate('enrolledStudents', 'fullName email'); // Populate with user details
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if there are enrolled students
        if (course.enrolledStudents.length === 0) {
            return res.status(200).json({ message: 'No students enrolled in this course', students: [] });
        }

        // Retrieve and send the enrolled students' information
        res.status(200).json({ message: 'Enrolled students retrieved successfully', students: course.enrolledStudents });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving enrolled students', error: error.message });
    }
};