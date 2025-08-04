const express = require("express");

const verifyToken = require("../../middleware/Token/verifyToken");
const {
  getUserNotifications,
  markAllAsRead,
} = require("../../controller/Notification/Notification");

const notificationRoutes = express.Router();

notificationRoutes.get("/", verifyToken, getUserNotifications);
notificationRoutes.post("/mark-all-as-read", verifyToken, markAllAsRead);

module.exports = notificationRoutes;
