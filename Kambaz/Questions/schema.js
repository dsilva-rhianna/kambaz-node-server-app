import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  quiz: { type: String, ref: "QuizModel" },
  title: String,
  points: Number,
  questionText: String,
  type: { type: String, enum: ["MC", "TF", "FIB"], default: "MC" },
  choices: [{ text: String, isCorrect: Boolean }],
  correctAnswer: Boolean,
  correctAnswers: [String],
}, { collection: "questions" });

export default questionSchema;