import express from 'express';
import {
    createAssignment,
    getAssignmentsByCourse,
    submitAssignment,
    deleteAssignment,
    updateAssignment
} from '../controllers/assignmentController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import {roleMiddleware} from '../middleware/roleMiddleware.js';

const router = express.Router();

// Route to create a new assignment (accessible only by teachers)
router.post('/:courseId/create', authMiddleware, roleMiddleware('teacher'), createAssignment);

// Route to fetch all assignments for a specific course (accessible by both students and teachers)
router.get('/:courseId', authMiddleware, getAssignmentsByCourse);

// Route to submit an assignment (accessible only by students)
router.post('/:courseId/:assignmentId/submit', authMiddleware, roleMiddleware('student'), submitAssignment);

// Route to delete an assignment (accessible only by teachers)
router.delete('/:assignmentId', authMiddleware, roleMiddleware('teacher'), deleteAssignment);

// Route to update an assignment (accessible only by teachers)
router.put('/:assignmentId', authMiddleware, roleMiddleware('teacher'), updateAssignment);

export default router;
