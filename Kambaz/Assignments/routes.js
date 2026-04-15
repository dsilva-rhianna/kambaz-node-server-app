import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
  const dao = AssignmentsDao();

  const findAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.assignmentId);
    res.json(assignment);
  };

  const createAssignment = async (req, res) => {
    const assignment = await dao.createAssignment({
      ...req.body,
      course: req.params.cid,
    });
    res.json(assignment);
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };

  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.json(status);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}