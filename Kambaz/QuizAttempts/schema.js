import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  _id: String,
  quiz: { type: String, ref: "QuizModel" },
  user: { type: String, ref: "UserModel" },
  attemptNumber: Number,
  answers: [{
    question: { type: String, ref: "QuestionModel" },
    answer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    pointsEarned: Number,
  }],
  score: Number,
  startedAt: Date,
  submittedAt: Date,
}, { collection: "quizAttempts" });

export default attemptSchema;