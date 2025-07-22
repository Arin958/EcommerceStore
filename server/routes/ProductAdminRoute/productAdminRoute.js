const express = require("express");
const verifyToken = require("../../middleware/Token/verifyToken");
const isAdmin = require("../../middleware/Admin/AdminRole");
const {
  fetchAllProduct,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../../controller/Admin/productAdminController");
const upload = require("../../middleware/FileUpload/uploadMiddleware");

const productAdminRoutes = express.Router();

productAdminRoutes.get("/", verifyToken, isAdmin, fetchAllProduct);
productAdminRoutes.post(
  "/",
  verifyToken,
  isAdmin,
  upload.array("images", 5),
  createProduct
);
productAdminRoutes.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.array("images", 5),
  editProduct
);
productAdminRoutes.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = productAdminRoutes;
