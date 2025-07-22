const express = require("express");
const checkoutRoutes = express.Router();
const verifyToken = require("../../middleware/Token/verifyToken");
const {
  createCheckout,
  finalizeCheckout,
  capturePayPalOrder,
} = require("../../controller/Checkout/Checkout");

checkoutRoutes.post("/", verifyToken, createCheckout);
checkoutRoutes.patch("/:id/finalize", verifyToken, finalizeCheckout);
checkoutRoutes.post("/capture-paypal", verifyToken, capturePayPalOrder);

module.exports = checkoutRoutes;
