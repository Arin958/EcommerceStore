const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cart = require("../model/Cart/Cart");

dotenv.config({
    path: "../.env",
});

mongoose
  .connect(process.env.MONGDB_URI)
  .then(async () => {
    const deleted = await cart.deleteMany({});
    console.log(deleted, "deleted");
    process.exit(0);
  })
  .catch((err) => console.log(err));
