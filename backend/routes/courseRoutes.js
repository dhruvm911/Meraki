import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    getEnrolledStudents
} from '../controllers/courseController.js'; 
import {authMiddleware} from '../middleware/authMiddleware.js'; 
import {roleMiddleware} from '../middleware/roleMiddleware.js'; 

const router = express.Router();

// Create a new course (accessible only by teachers)
router.post('/create', authMiddleware, roleMiddleware('teacher'), createCourse);

// Get all courses (accessible by everyone)
router.get('/', authMiddleware, getAllCourses);

// Get a specific course by ID (accessible by everyone)
router.get('/:courseId', authMiddleware, getCourseById);

// Update a course (accessible only by teachers)
router.patch('/:courseId', authMiddleware, roleMiddleware('teacher'), updateCourse);

// Delete a course (accessible only by teachers)
router.delete('/:courseId', authMiddleware, roleMiddleware('teacher'), deleteCourse);

// Enroll in a course (accessible only by students)
router.post('/:courseId/enroll', authMiddleware, roleMiddleware('student'), enrollInCourse);

// Get all enrolled students in a course (accessible only by teachers)
router.get('/:courseId/enrolled-students', authMiddleware, roleMiddleware('teacher'), getEnrolledStudents);

export default router;
