const Order = require("../../model/Order/Order");
const Notification = require("../../model/Notification/Notification");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered"
          ? Date.now()
          : order.deliveredAt || Date.now();

      await order.save();

      try {
        await Notification.create({
          recipient: order.user._id,
          message: `Order ${order._id} status updated to ${order.status}`,
        });
      } catch (error) {
        console.log(error);
      }

      const updatedOrder = await Order.findById(order._id).populate(
        "user",
        "name email"
      );

      res.status(200).json({ success: true, message: "Order Updated" });
    } else {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
