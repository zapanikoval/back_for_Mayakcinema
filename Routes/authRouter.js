const express = require("express");
const authController = require("../Controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/register", authController.registerUser);
authRouter.post("/refresh", authController.refreshToken);
authRouter.get("/confirm/:token", authController.confirmEmail);

module.exports = authRouter;
