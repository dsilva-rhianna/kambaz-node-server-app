// import EnrollmentsDao from "./dao.js";

// export default function EnrollmentsRoutes(app, db) {
//   const dao = EnrollmentsDao(db);
//   const enrollUserInCourse = (req, res) => {
//     const { courseId } = req.params;
//     const currentUser = req.session["currentUser"];
//     if (!currentUser) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
//     res.json(enrollment);
//   };
//   const unenrollUserFromCourse = (req, res) => {
//     const { courseId } = req.params;
//     const currentUser = req.session["currentUser"];
//     if (!currentUser) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     const result = dao.unenrollUserFromCourse(currentUser._id, courseId);
//     if (result) {
//       res.sendStatus(200);
//     } else {
//       res.status(404).json({ message: "Enrollment not found" });
//     }
//   };
//   const findEnrollmentsForUser = (req, res) => {
//     const currentUser = req.session["currentUser"];
//     if (!currentUser) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     const enrollments = dao.findEnrollmentsForUser(currentUser._id);
//     res.json(enrollments);
//   };
//   const enrollUser = (req, res) => {
//     const { userId, courseId } = req.params;
//     const currentUser = req.session["currentUser"];
//     if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }
//     const result = dao.enrollUserInCourse(userId, courseId);
//     if (result) {
//       res.json(result);
//     } else {
//       res.status(400).json({ message: "Already enrolled" });
//     }
//   };
//   app.post("/api/users/current/courses/:courseId", enrollUserInCourse);
//   app.delete("/api/users/current/courses/:courseId", unenrollUserFromCourse);
//   app.get("/api/users/current/enrollments", findEnrollmentsForUser);
//   app.post("/api/users/:userId/courses/:courseId", enrollUser);
// }