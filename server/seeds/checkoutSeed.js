const mongoose = require("mongoose");
const dotenv = require("dotenv");
const checkout = require("../model/Checkout/Checkout");

dotenv.config({
    path: "../.env",
});

mongoose
  .connect(process.env.MONGDB_URI)
  .then(async () => {
    const deleted = await checkout.deleteMany({});
    console.log(deleted, "deleted");
    process.exit(0);
  })
  .catch((err) => console.log(err));
