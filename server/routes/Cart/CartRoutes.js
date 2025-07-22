const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItems,
  mergeCarts,
} = require("../../controller/Cart/CartController");
const verifyToken = require("../../middleware/Token/verifyToken");

const cartRoutes = express.Router();

cartRoutes.post("/", addToCart);
cartRoutes.get("/", getCart);
cartRoutes.delete("/", removeFromCart);
cartRoutes.put("/", updateCartItems);
cartRoutes.post("/merge", verifyToken, mergeCarts);

module.exports = cartRoutes;
