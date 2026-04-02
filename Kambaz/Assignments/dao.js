import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAllAssignments() {
    return db.assignments;
  }
  function findAssignmentsForCourse(courseId) {
    return db.assignments.filter((assignment) => assignment.course === courseId);
  }
  function findAssignmentById(assignmentId) {
    return db.assignments.find((assignment) => assignment._id === assignmentId);
  }
  function createAssignment(assignment) {
    const newAssignment = {
      ...assignment,
      _id: uuidv4(),
    };
    db.assignments.push(newAssignment);
    return newAssignment;
  }
  function updateAssignment(assignmentId, assignmentUpdates) {
    const index = db.assignments.findIndex((a) => a._id === assignmentId);
    if (index === -1) return null;
    db.assignments[index] = { ...db.assignments[index], ...assignmentUpdates };
    return db.assignments[index];
  }
  function deleteAssignment(assignmentId) {
    const index = db.assignments.findIndex((a) => a._id === assignmentId);
    if (index === -1) return null;
    db.assignments.splice(index, 1);
    return true;
  }
  return {
    findAllAssignments,
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}