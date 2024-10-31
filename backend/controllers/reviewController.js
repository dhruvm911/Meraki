import { Review } from '../models/reviewSchema.js';
import { Course } from '../models/courseSchema.js';

// export const addReview = async (req, res) => {
//     const { courseId, rating, comment } = req.body;
//     const studentId = req.user._id; // Assuming the user is authenticated

//     try {
//         // Check if the course exists
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({ message: 'Course not found' });
//         }

//         // Check if the student has already reviewed this course
//         const existingReview = await Review.findOne({ course: courseId, student: studentId });
//         if (existingReview) {
//             return res.status(400).json({ message: 'You have already reviewed this course' });
//         }

//         // Create a new review
//         const newReview = new Review({
//             course: courseId,
//             student: studentId,
//             rating,
//             comment
//         });

//         // Save the review and respond
//         await newReview.save();
//         res.status(201).json({ message: 'Review added successfully', review: newReview });
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding review', error: error.message });
//     }
// };

export const addReview = async (req, res) => {
    const { courseId } = req.params;
    const { rating, comment } = req.body;
    const studentId = req.user._id;

    try {
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the student has already reviewed this course
        const existingReview = await Review.findOne({ course: courseId, student: studentId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this course' });
        }
        // Create the review
        const review = new Review({
            course: courseId,
            student: studentId,
            rating,
            comment,
        });
        await review.save();

        // Add review to the course's reviews array
        await Course.findByIdAndUpdate(courseId, { $push: { reviews: review._id } });

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};


export const getCourseReviews = async (req, res) => {
    const { courseId } = req.params;

    try {
        // Find course and populate its reviews
        const course = await Course.findById(courseId).populate({
            path: 'reviews',
            populate: { path: 'student', select: 'fullName' }, // Populate student details in reviews
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ reviews: course.reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};


export const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const studentId = req.user._id;

    try {
        // Find the review and ensure the student is the owner
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, student: studentId },
            { rating, comment },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
};



export const deleteReview = async (req, res) => {
    const { reviewId, courseId } = req.params;
    const studentId = req.user._id;

    try {
        // Delete the review only if the student is the owner
        const review = await Review.findOneAndDelete({ _id: reviewId, student: studentId });

        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        // Remove the review from the course's reviews array
        await Course.findByIdAndUpdate(courseId, { $pull: { reviews: reviewId } });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};
