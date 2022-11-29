import express from "express";
const router = express.Router();
const userServices = require("../service/userServices.js");
const jwt = require("jsonwebtoken");
const Validator = require("jsonschema").Validator;
const { uservalidationSchema } = require("../model/User");
const v = new Validator();
const verifytoken = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    let results = await userServices.getRegisteredUser();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json("Users not found");
  }
});

router.post("/register", async (req, res) => {
  try {
    let user = req.body;
    const validate = v.validate(user, uservalidationSchema);
    if (!validate.valid) {
      res.status(400).json("Error", validate.toString());
      return;
    }
    let createUser = await userServices.getCreateUser(user);
    res.status(201).json(createUser);
  } catch (error) {
    res.status(400).json("Users not created");
  }
});

router.post("/login", async (req, res) => {
  try {
    const reqUser = req.body;
    //console.log("EMAIL USER ", reqUser.email);
    let userFind = await userServices.findUserByEmail(reqUser.email);
    //console.log("USERFIND ");
    if (!userFind) {
      console.log("ERROR ");
      res.status(404).json("error en if");
    }
    //console.log("usertojken ");
    const userToken = { user: userFind.email, id: userFind.id };
    //console.log("USERTOKEN ", userToken);
    let token = await userServices.generateToken(
      userFind.password,
      reqUser.password,
      userToken
    );
    //console.log("TOKEN ", token);
    res.status(200).json({ token: token });
  } catch (error) {
    //console.log("ERROR CATCH", error);
    res.status(400).json("Error", error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let user = req.body;
    let id = req.params.id;
    let updateUser = await userServices.getUpdateUser(id, user);
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json("Users not created");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await userServices.getDeletedUser(id);
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(400).json("Users not deleted");
  }
});

router.get("/profile-user", verifytoken, async (req, res) => {
  try {
    res.status(200).json("User profile section");
  } catch (err) {
    res.status(400).json("Acceso prohibido");
  }
});

module.exports = router;
