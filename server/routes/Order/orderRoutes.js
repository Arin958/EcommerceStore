const express = require("express");
const {
  getMyOrders,
  getOrderDetails,
} = require("../../controller/Orders/orderController");
const verifyToken = require("../../middleware/Token/verifyToken");

const orderRoutes = express.Router();

orderRoutes.get("/", verifyToken, getMyOrders);
orderRoutes.get("/:id", verifyToken, getOrderDetails);

module.exports = orderRoutes;
