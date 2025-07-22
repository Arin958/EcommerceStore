require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const compression = require("compression"); // ✅ Add this line
const connectDb = require("./config/db");

// Routes
const authRouter = require("./routes/Auth/authRoutes");
const productAdminRoutes = require("./routes/ProductAdminRoute/productAdminRoute");
const productUserRouter = require("./routes/UserAdminRoute/userAdminRoute");
const cartRoutes = require("./routes/Cart/CartRoutes");
const checkoutRoutes = require("./routes/Checkout/CheckoutRoute");
const orderRoutes = require("./routes/Order/orderRoutes");
const orderAdminRoutes = require("./routes/Order/orderAdminRoute");
const userAdminRouter = require("./routes/UserAdminRoute/getAllUser");
const adminDashboard = require("./routes/Admin/adminDashBoard");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to DB and Cron Jobs
require("./cronjobs/finalizeStaleCheckouts");
connectDb();



app.use(compression({
  level: 6,            // Compression level (1-11)
  threshold: 0,        // Minimum response size to compress
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", productAdminRoutes);
app.use("/api/user", productUserRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/orderAdmin", orderAdminRoutes);
app.use("/api/userAdmin", userAdminRouter);
app.use("/api/adminDashboard", adminDashboard);

// ✅ Start Server
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
