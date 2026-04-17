import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, required: true },
  description: String,
  course: { type: String, ref: "CourseModel" },
  quizType: { type: String, enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"], default: "Graded Quiz" },
  points: Number,
  assignmentGroup: { type: String, enum: ["Quizzes", "Exams", "Assignments", "Project"], default: "Quizzes" },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  attemptsAllowed: { type: Number, default: 1 },
  showCorrectAnswers: String,
  accessCode: String,
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestions: { type: Boolean, default: false },
  dueDate: Date,
  availableDate: Date,
  untilDate: Date,
  published: { type: Boolean, default: false },
}, { collection: "quizzes" });

export default quizSchema;