const User = require("../../model/User/User");
const Order = require("../../model/Order/Order");
const Product = require("../../model/products/Product");

exports.getDashBoardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();

  const adminCount = await User.countDocuments({ role: "admin" });

  const verifiedCount = await User.countDocuments({
    isVerified: true,
  });

  const sevenDaysAgon = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentSignUps = await User.countDocuments({
    createdAt: {
      $gte: sevenDaysAgon,
    },
  });

  const lastMonthSignUps = Math.floor(totalUsers * 0.3);

  const roleDistribution = await User.aggregate([
    {
      $group: {
        _id: "$role",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({
    status: "Pending",
  });
  const completedOrders = await Order.countDocuments({
    status: "Delivered",
  });

  const totalRevenueData = await Order.aggregate([
    {
      $match: {
        status: "Delivered",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);

  const totalRevenue = totalRevenueData[0]?.totalRevenue || 0;

  const revenueLast7DaysData = await Order.aggregate([
    {
      $match: {
        status: "Delivered",
        createdAt: {
          $gte: sevenDaysAgon,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);

  const revenueLast7Days = revenueLast7DaysData[0]?.totalRevenue || 0;

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const totalProducts = await Product.countDocuments();

  const lowStockProducts = await Product.countDocuments({
    stock: {
      $lt: 10,
    },
  });
  const outOfStockProducts = await Product.countDocuments({
    stock: 0,
  });

  res.status(200).json({
    success: true,
    totalUsers,
    adminCount,
    verifiedCount,
    recentSignUps,
    lastMonthSignUps,
    roleDistribution,
    totalOrders,
    pendingOrders,
    completedOrders,
    totalRevenue,
    revenueLast7Days,
    averageOrderValue,
    totalProducts,
    lowStockProducts,
    outOfStockProducts
  });
};
