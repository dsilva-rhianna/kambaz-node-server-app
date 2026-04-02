import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const alreadyEnrolled = db.enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );
    if (!alreadyEnrolled) {
      db.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
      return true;
    }
    return false;
  }
  function unenrollUserFromCourse(userId, courseId) {
    const index = db.enrollments.findIndex(
      (e) => e.user === userId && e.course === courseId
    );
    if (index !== -1) {
      db.enrollments.splice(index, 1);
      return true;
    }
    return false;
  }
  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }
  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
  };
}