import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizAttemptsDao() {
  const findAttemptsForUserAndQuiz = (userId, quizId) => model.find({ user: userId, quiz: quizId }).sort({ attemptNumber: -1 });

  const createAttempt = async (attempt) => {
    const newAttempt = { ...attempt, _id: uuidv4() };
    return model.create(newAttempt);
  };

  const getLastAttempt = (userId, quizId) => model.findOne({ user: userId, quiz: quizId }).sort({ attemptNumber: -1 });
  
  return { 
    findAttemptsForUserAndQuiz, 
    createAttempt, 
    getLastAttempt, 
  };
}