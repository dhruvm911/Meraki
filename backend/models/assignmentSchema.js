import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    submissionLink: { type: String }, // URL for students to submit work
}, { timestamps: true });

export const Assignment = mongoose.model('Assignment',assignmentSchema);
