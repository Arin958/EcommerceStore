const express = require("express");
const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../../controller/Orders/orderAdminController");
const verifyToken = require("../../middleware/Token/verifyToken");
const isAdmin = require("../../middleware/Admin/AdminRole");

const orderAdminRoutes = express.Router();

orderAdminRoutes.get("/", verifyToken, isAdmin, getAllOrders);
orderAdminRoutes.put("/:id", verifyToken, isAdmin, updateOrderStatus);

orderAdminRoutes.delete("/:id", verifyToken, isAdmin, deleteOrder);

module.exports = orderAdminRoutes;
