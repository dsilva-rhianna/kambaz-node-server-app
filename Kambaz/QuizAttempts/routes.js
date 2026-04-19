import QuizAttemptsDao from "./dao.js";
import QuestionsDao from "../questions/dao.js";

export default function QuizAttemptsRoutes(app) {
  const dao = QuizAttemptsDao();
  const questionsDao = QuestionsDao();

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
    const { quizId, userId, answers, startedAt, submittedAt } = req.body;
    const questions = await questionsDao.findQuestionsForQuiz(quizId);
    let totalScore = 0;
    const answerDetails = [];
    for (const ans of answers) {
      const q = questions.find(q => q._id === ans.questionId);
      if (!q) continue;
      let isCorrect = false;
      let pointsEarned = 0;
      if (q.type === "MC") {
        const correctChoice = q.choices?.find(c => c.isCorrect);
        isCorrect = correctChoice && ans.answer === correctChoice.text;
      } else if (q.type === "TF") {
        isCorrect = String(ans.answer).toLowerCase() === String(q.correctAnswer).toLowerCase();
      } else if (q.type === "FIB") {
        isCorrect = q.correctAnswers?.some(ca => ca.toLowerCase() === (ans.answer || "").toLowerCase());
      }
      if (isCorrect) pointsEarned = q.points;
      totalScore += pointsEarned;
      answerDetails.push({
        question: q._id,
        answer: ans.answer,
        isCorrect,
        pointsEarned,
      });
    }
    const attemptCount = await dao.getAttemptCount(userId, quizId);
    const attemptNumber = attemptCount + 1;
    const newAttempt = {
      _id: `${userId}-${quizId}-${attemptNumber}`,
      quiz: quizId,
      user: userId,
      attemptNumber,
      answers: answerDetails,
      score: totalScore,
      startedAt,
      submittedAt,
    };
    const saved = await dao.createAttempt(newAttempt);
    res.status(201).json(saved);
  };

  app.get("/api/users/:userId/quizzes/:quizId/attempts", findAttemptsForUserAndQuiz);
  app.get("/api/users/:userId/quizzes/:quizId/lastAttempt", getLastAttempt);
  app.post("/api/quizzes/:quizId/attempts", createAttempt);
}