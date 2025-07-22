const express = require("express");
const {
  login,
  signup,
  logout,
  checkAuth,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../../controller/Auth/authController");
const verifyToken = require("../../middleware/Token/verifyToken");
const authRouter = express.Router();

authRouter.get("/checkAuth", verifyToken, checkAuth);
authRouter.get("/logout", logout);
authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/verify", verifyEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;
