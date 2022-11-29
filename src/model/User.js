const mongoose = require("mongoose");

const User = mongoose.model("user", {
  name: String,
  last_name: String,
  email: String,
  password: String,
});

const uservalidationSchema = {
  id: "/User",
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    last_name: { type: "string", minLength: 1 },

    email: { type: "string", minLength: 1 },
    password: { type: "string", minLength: 1 },
  },
  required: ["name", "last_name", "email", "password"],
};

module.exports = {
  User,
  uservalidationSchema,
};
