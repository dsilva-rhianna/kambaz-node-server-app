import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);
  const findAllAssignments = (req, res) => {
    res.json(dao.findAllAssignments());
  };
  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    res.json(dao.findAssignmentsForCourse(courseId));
  };
  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    if (!assignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.json(assignment);
  };
  const createAssignment = (req, res) => {
    const newAssignment = dao.createAssignment(req.body);
    res.status(201).json(newAssignment);
  };
  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const updated = dao.updateAssignment(assignmentId, req.body);
    if (!updated) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.sendStatus(200);
  };
  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const deleted = dao.deleteAssignment(assignmentId);
    if (!deleted) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.sendStatus(200);
  };
  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}