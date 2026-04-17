import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
  const dao = QuestionsDao();

  const findQuestionsForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsForQuiz(quizId);
    res.json(questions);
  };

  const createQuestion = async (req, res) => {
    const newQuestion = await dao.createQuestion(req.body);
    res.status(201).json(newQuestion);
  };

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.updateQuestion(questionId, req.body);
    if (status.modifiedCount === 0) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.sendStatus(200);
  };

  const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.deleteQuestion(questionId);
    if (status.deletedCount === 0) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.sendStatus(200);
  };

  app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
  app.post("/api/questions", createQuestion);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
}