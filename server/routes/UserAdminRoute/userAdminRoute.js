const express = require("express");
const {
  getAllActiveProducts,
  getSimilarProducts,
  getProductById,
  getBestSeller,
  getNewArrivals,
  getFeaturedProducts,
  getCategory,
  getSimilarProductByCategory,
  getTrendingProducts,
} = require("../../controller/User/productUserController");
const {
  getFilteredProducts,
} = require("../../controller/User/productFillterController");

const productUserRouter = express.Router();

// filterd Route

productUserRouter.get("/filter", getFilteredProducts);

productUserRouter.get("/allActiveProducts", getAllActiveProducts);
productUserRouter.get("/getProductById/:id", getProductById);
productUserRouter.get("/getSimilarProducts/:id", getSimilarProducts);
productUserRouter.get("/featured-products", getFeaturedProducts);
productUserRouter.get("/best-seller", getBestSeller);
productUserRouter.get("/new-arrivals", getNewArrivals);
productUserRouter.get("/trending", getTrendingProducts)
productUserRouter.get("/category", getCategory);
productUserRouter.get("/category/:category", getSimilarProductByCategory);

module.exports = productUserRouter;
