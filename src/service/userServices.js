const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  getUsers,
  createUser,
  updateUser,
  deletedUser,
  getUserByEmail,
} = require("../repository/user.repository");

const getRegisteredUser = async () => {
  return await getUsers();
};

const getCreateUser = async (user) => {
  return await createUser(user);
};

const getUpdateUser = async (id, user) => {
  return await updateUser(id, user);
};

const getDeletedUser = async (id) => {
  return await deletedUser(id);
};

const findUserByEmail = async (email) => {
  const userEmail = await getUserByEmail(email);
  return userEmail;
};

const generateToken = async (hashPassword, comparePassword, userData) => {
  return new Promise((res, rej) => {
    if (bcryptjs.compareSync(comparePassword, hashPassword)) {
      jwt.sign(
        { user: userData },
        process.env.SECRET_KEY,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            rej("PASSWORD O USUARIO INVALIDO");
          }
          res(token);
        }
      );
    } else {
      rej("PASSWORD O USUARIO INVALIDO");
    }
  });
};

module.exports = {
  getRegisteredUser,
  getCreateUser,
  getUpdateUser,
  getDeletedUser,
  findUserByEmail,
  generateToken,
};
