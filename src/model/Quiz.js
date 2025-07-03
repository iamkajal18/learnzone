import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: [true, 'Quiz name is required'],
        trim: true,
        maxlength: [255, 'Quiz name cannot exceed 255 characters']
    },
    totalQuestions: {
        type: Number,
        required: [true, 'Total questions is required'],
        min: [1, 'Total questions must be at least 1']
    },
    totalMarks: {
        type: Number,
        required: [true, 'Total marks is required'],
        min: [1, 'Total marks must be at least 1']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: [true, 'Created by is required'],
        trim: true,
        maxlength: [100, 'Created by cannot exceed 100 characters']
    }
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
export default Quiz;