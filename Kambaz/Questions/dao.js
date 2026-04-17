import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuestionsDao() {
  const findQuestionsForQuiz = (quizId) => model.find({ quiz: quizId });
  
  const createQuestion = async (question) => {
    const newQuestion = { ...question, _id: uuidv4() };
    return model.create(newQuestion);
  };

  const updateQuestion = (id, updates) => model.updateOne({ _id: id }, { $set: updates });

  const deleteQuestion = (id) => model.deleteOne({ _id: id });
  
  return { 
    findQuestionsForQuiz, 
    createQuestion, 
    updateQuestion, 
    deleteQuestion, 
  };
}