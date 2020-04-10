import { Router } from "express";
const userController = Router();

userController.post("/register", async (req, res) => {
  let newUser: UserRegistrationPayload = req.body;
  res.status(200).send("user registration");
})

userController.post("/login", async (req, res) => {
  res.status(200).send("user login");
})

export default userController;