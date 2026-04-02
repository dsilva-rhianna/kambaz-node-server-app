import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
  let { users } = db;
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    db.users.push(newUser);
    return newUser;
  };
  const findAllUsers = () => users;
  const findUserById = (userId) => users.find((user) => user._id === userId);
  const findUserByUsername = (username) => users.find((user) => user.username === username);
  const findUserByCredentials = (username, password) =>
    users.find((user) => user.username === username && user.password === password);
  const updateUser = (userId, userUpdates) => {
    const index = db.users.findIndex((u) => u._id === userId);
    if (index === -1) return null;
    db.users[index] = { ...db.users[index], ...userUpdates };
    return db.users[index];
  }
  const deleteUser = (userId) => {
    const index = db.users.findIndex(u => u._id === userId);
    if (index !== -1) {
      db.users.splice(index, 1);
      return true;
    }
    return false;
  }
  return {
    createUser, findAllUsers, findUserById, findUserByUsername, findUserByCredentials, updateUser, deleteUser };
}
