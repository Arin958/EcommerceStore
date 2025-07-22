const express = require("express");

const verifyToken = require("../../middleware/Token/verifyToken");
const isAdmin = require("../../middleware/Admin/AdminRole");
const getAllUser = require("../../controller/Admin/getAllUser");

const userAdminRouter = express.Router();

userAdminRouter.get("/", verifyToken, isAdmin, getAllUser);

module.exports = userAdminRouter;
