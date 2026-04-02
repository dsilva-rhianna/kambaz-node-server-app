import UsersDao from "./dao.js";
export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  const createUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    const newUser = dao.createUser(req.body);
    res.status(201).json(newUser);
  };
  const deleteUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    const { userId } = req.params;
    const success = dao.deleteUser(userId);
    if (!success) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    db.enrollments = db.enrollments.filter((e) => e.user !== userId);
    res.sendStatus(200);
  };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };
  const updateUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    const { userId } = req.params;
    const userUpdates = req.body;
    const updatedUser = dao.updateUser(userId, userUpdates);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(updatedUser);
  };
  const signup = (req, res) => { 
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = (req, res) => { 
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const findUsersInCourse = (req, res) => {
    const { courseId } = req.params;
    const { users, enrollments } = db;
    const enrolledUserIds = enrollments
      .filter((e) => e.course === courseId)
      .map((e) => e.user);
    const enrolledUsers = users.filter((u) => enrolledUserIds.includes(u._id));
    res.json(enrolledUsers);
  };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/courses/:courseId/users", findUsersInCourse);
}

