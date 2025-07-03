import mongoose, { Schema, models, model } from 'mongoose';

const InterviewResultSchema = new Schema({
  role: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const InterviewResult = models.InterviewResult || model('InterviewResult', InterviewResultSchema);

export default InterviewResult;
