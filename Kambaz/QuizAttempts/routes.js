import QuizAttemptsDao from "./dao.js";

export default function QuizAttemptsRoutes(app) {
  const dao = QuizAttemptsDao();

  const findAttemptsForUserAndQuiz = async (req, res) => {
    const { userId, quizId } = req.params;
    const attempts = await dao.findAttemptsForUserAndQuiz(userId, quizId);
    res.json(attempts);
  };

  const getLastAttempt = async (req, res) => {
    const { userId, quizId } = req.params;
    const attempt = await dao.getLastAttempt(userId, quizId);
    res.json(attempt);
  };

  const createAttempt = async (req, res) => {
    const newAttempt = await dao.createAttempt(req.body);
    res.status(201).json(newAttempt);
  };

  app.get("/api/users/:userId/quizzes/:quizId/attempts", findAttemptsForUserAndQuiz);
  app.get("/api/users/:userId/quizzes/:quizId/lastAttempt", getLastAttempt);
  app.post("/api/quizAttempts", createAttempt);
}