const { User } = require("../model");
const bcryptjs = require("bcryptjs");

const getUsers = async () => {
  const users = await User.find().exec();
  return users;
};

const createUser = async (user) => {
  user.password = await bcryptjs.hash(user.password, 8);
  let dataBaseUser = new User(user);
  await dataBaseUser.save();
  return dataBaseUser;
};

const updateUser = async (id, user) => {
  const userId = await User.findByIdAndUpdate(id, user).exec();
  return userId;
};

const deletedUser = async (id) => {
  const userId = await User.findByIdAndDelete(id).exec();
  return userId;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email }).exec();
  return user;
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deletedUser,
  getUserByEmail,
};
