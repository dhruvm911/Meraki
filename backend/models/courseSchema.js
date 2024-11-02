import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videos: [{ type: String }], // URLs for videos stored in Cloudinary
    files: [{ type: String }], // Other supplementary files
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    totalSales: { type: Number, default: 0 },
}, { timestamps: true });

export const Course = mongoose.model('Course',courseSchema);
