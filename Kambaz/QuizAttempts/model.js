import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.models.AttemptModel || mongoose.model("AttemptModel", schema);
export default model;