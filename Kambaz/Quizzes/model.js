import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.models.QuizModel || mongoose.model("QuizModel", schema);
export default model;