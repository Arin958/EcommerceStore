const cron = require("node-cron");
const checkout = require("../model/Checkout/Checkout");
const Order = require("../model/Order/Order");
const Cart = require("../model/Cart/Cart");

const finalizeStaleCheckout = async (req, res) => {
  try {
    const staleCheckouts = await checkout.find({
      status: "pending",
      isPaid: true,
      isFinalized: false,
    });
    for (const checkout of staleCheckouts) {
      const existingOrder = await Order.findOne({
        "shippingAddress.address": checkout.shippingAddress.address,
        totalPrice: checkout.totalPrice,
      });

      if (existingOrder) continue;

      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        paymentStatus: "paid",
        isPaid: true,
        paidAt: checkout.paidAt || new Date(),
        isDelivered: false,
        isFinalized: true,
        finalizedAt: Date.now(),
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      if (checkout.user) {
        await Cart.findOneAndDelete({ user: checkout.user });
      }

      console.log(`Finalized stale checkout: ${checkout._id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

cron.schedule("*/5 * * * *", finalizeStaleCheckout);
