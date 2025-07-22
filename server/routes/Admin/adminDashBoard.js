const express = require("express");

const verifyToken = require("../../middleware/Token/verifyToken");
const isAdmin = require("../../middleware/Admin/AdminRole");
const { getDashBoardStats } = require("../../controller/Admin/adminDashboar");
const adminDashboard = express.Router();

adminDashboard.get("/", verifyToken, isAdmin, getDashBoardStats);

module.exports = adminDashboard;
