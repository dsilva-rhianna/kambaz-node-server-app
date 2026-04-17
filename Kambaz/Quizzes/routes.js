import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  const findAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    res.json(quiz);
  };

  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  const createQuiz = async (req, res) => {
    const newQuiz = await dao.createQuiz(req.body);
    res.status(201).json(newQuiz);
  };

  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.updateQuiz(quizId, req.body);
    if (status.modifiedCount === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    res.sendStatus(200);
  };

  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    if (status.deletedCount === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    res.sendStatus(200);
  };

  const publishQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.publishQuiz(quizId);
    if (status.matchedCount === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    res.sendStatus(200);
  };

  const unpublishQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.unpublishQuiz(quizId);
    if (status.matchedCount === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    res.sendStatus(200);
  };

  app.get("/api/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/api/quizzes", createQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.post("/api/quizzes/:quizId/publish", publishQuiz);
  app.delete("/api/quizzes/:quizId/publish", unpublishQuiz);
}