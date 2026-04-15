import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao() {
  const findAllAssignments = () => model.find();

  const findAssignmentsForCourse = (courseId) =>
    model.find({ course: courseId });

  const findAssignmentById = (assignmentId) =>
    model.findById(assignmentId);

  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
  };

  const updateAssignment = (assignmentId, assignment) =>
    model.updateOne({ _id: assignmentId }, { $set: assignment });

  const deleteAssignment = (assignmentId) =>
    model.deleteOne({ _id: assignmentId });

  return {
    findAllAssignments,
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}