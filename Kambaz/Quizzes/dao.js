import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {

  const findAllQuizzes = () => model.find();

  const findQuizById = (id) => model.findById(id);

  const findQuizzesForCourse = (courseId) => model.find({ course: courseId });

  const createQuiz = async (quiz) => {
    const newQuiz = { ...quiz, _id: quiz._id || uuidv4() };
    return model.create(newQuiz);
  };

  const updateQuiz = (id, updates) => model.updateOne({ _id: id }, { $set: updates });

  const deleteQuiz = (id) => model.deleteOne({ _id: id });

  const publishQuiz = (id) => model.updateOne({ _id: id }, { $set: { published: true } });

  const unpublishQuiz = (id) => model.updateOne({ _id: id }, { $set: { published: false } });
  
  return { 
    findAllQuizzes, 
    findQuizById, 
    findQuizzesForCourse, 
    createQuiz, 
    updateQuiz, 
    deleteQuiz, 
    publishQuiz, 
    unpublishQuiz, 
  };
}