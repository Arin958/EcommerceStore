const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../model/products/Product");
const { productData } = require("../data/productData");

dotenv.config({
    path: "../.env",
});

mongoose
  .connect(process.env.MONGDB_URI)
  .then(async () => {
    const inserted = await Product.insertMany(productData);
    console.log(inserted);
    process.exit(0);
  })
  .catch((err) => console.log(err));
