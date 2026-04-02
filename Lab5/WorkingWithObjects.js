const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};
const module = {
  id: "M101",
  name: "React Fundamentals",
  description: "Introduction to React components, JSX, and props.",
  course: "1234",
};
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const getAssignmentScore = (req, res) => {
    res.json(assignment.score);
  };
  const getAssignmentCompleted = (req, res) => {
    res.json(assignment.completed);
  };
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/score", getAssignmentScore);
  app.get("/lab5/assignment/completed", getAssignmentCompleted);
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  const updateAssignmentScore = (req, res) => {
    const { score } = req.params;
    assignment.score = parseInt(score);
    res.json(assignment);
  };
  const updateAssignmentCompleted = (req, res) => {
    const { completed } = req.params;
    assignment.completed = (completed === "true");
    res.json(assignment);
  };
  app.get("/lab5/assignment/score/:score", updateAssignmentScore);
  app.get("/lab5/assignment/completed/:completed", updateAssignmentCompleted);

  const getModule = (req, res) => {
    res.json(module);
  };
  const getModuleName = (req, res) => {
    res.json(module.name);
  };
  const getModuleDescription = (req, res) => {
    res.json(module.description);
  };
  const updateModuleName = (req, res) => {
    const { name } = req.params;
    module.name = name;
    res.json(module);
  };
  const updateModuleDescription = (req, res) => {
    const { description } = req.params;
    module.description = description;
    res.json(module);
  };
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/description", getModuleDescription);
  app.get("/lab5/module/name/:name", updateModuleName);
  app.get("/lab5/module/description/:description", updateModuleDescription);
};
