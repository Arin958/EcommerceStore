const { client } = require("../../config/paypal");
const paypal = require("@paypal/checkout-server-sdk");
const Cart = require("../../model/Cart/Cart");
const Checkout = require("../../model/Checkout/Checkout");
const Order = require("../../model/Order/Order");
const Product = require("../../model/products/Product");

exports.getCheckout = async (req, res) => {
  try {
    const userId = req.user?._id;
    const checkout = await Checkout.findOne({ user: userId });
    res.status(200).json({ success: true, checkout });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

exports.createCheckout = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.user?._id;
    const guestId = req.query?.guestId;

    // Get cart based on login state
    const cart = await Cart.findOne(userId ? { user: userId } : { guestId });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Rebuild checkout items from DB product
    const checkoutItems = [];
    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      checkoutItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity: item.quantity,
      });
    }

    if (checkoutItems.length === 0) {
      return res.status(400).json({ error: "No valid products to checkout" });
    }

    // Calculate total price
    const totalPrice = checkoutItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Handle PayPal payment
    if (paymentMethod === "PayPal") {
      // Create PayPal order
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalPrice.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: totalPrice.toFixed(2),
                },
              },
            },
            items: checkoutItems.map((item) => ({
              name: item.name,
              unit_amount: {
                currency_code: "USD",
                value: item.price.toFixed(2),
              },
              quantity: item.quantity.toString(),
            })),
          },
        ],
      });

      try {
        const paypalOrder = await client().execute(request);
        return res.status(200).json({
          success: true,
          paypalOrderId: paypalOrder.result.id,
          checkoutData: {
            user: userId,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
          },
        });
      } catch (err) {
        console.error("PayPal order creation error:", err);
        return res.status(500).json({ error: "Failed to create PayPal order" });
      }
    }

    // For non-PayPal methods (Cash on Delivery)
    const checkout = await Checkout.create({
      user: userId,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: paymentMethod === "Cash on Delivery" ? false : undefined,
      paymentStatus: "pending",
    });

    await Cart.findByIdAndDelete(cart._id);
    res.status(201).json({ success: true, checkout });
  } catch (err) {
    console.error("Create checkout error:", err);
    res.status(500).json({ error: "Failed to create checkout" });
  }
};

// Add this new endpoint for PayPal order capture
exports.capturePayPalOrder = async (req, res) => {
  console.log("🔍 Request received at:", new Date());
  console.log("🔍 Request headers:", req.headers);
  console.log("🔍 Raw request body:", req.body);

  // Debug middleware - add this temporary middleware before your verifyToken
  const debugMiddleware = (req, res, next) => {
    console.log("📦 Request body in middleware:", req.body);
    next();
  };

  // Then update your route to:
  // router.post('/paypal', debugMiddleware, verifyToken, capturePayPalOrder);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Request body is empty",
      advice: [
        "Check Content-Type header is set to application/json",
        "Verify no middleware is modifying the request body",
        "Ensure payload matches expected format",
      ],
    });
  }

  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Destructure with defaults
    const {
      orderID,
      checkoutItems = [],
      shippingAddress = {},
      totalPrice = 0,
      paymentMethod = "",
      paypalDetails = {},
    } = req.body;

    // Validate required fields
    const requiredFields = {
      orderID,
      shippingAddress,
      checkoutItems,
      totalPrice,
      paymentMethod,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
        receivedData: {
          orderID: !!orderID,
          shippingAddress: !!shippingAddress,
          checkoutItems: !!checkoutItems,
          totalPrice: !!totalPrice,
          paymentMethod: !!paymentMethod,
        },
      });
    }

    // PayPal capture logic
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client().execute(request);
    console.log("💰 PayPal capture result:", capture);

    if (capture.result.status !== "COMPLETED") {
      return res.status(400).json({
        error: "PayPal payment not completed",
        details: capture.result,
      });
    }

    // Create checkout record
    const checkout = await Checkout.create({
      user: userId,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: true,
      paidAt: new Date(),
      paymentStatus: "paid",
      paymentDetails: {
        paypalCapture: capture.result,
        ...paypalDetails,
      },
      isFinalized: false
    });

    // Clear cart
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({
      success: true,
      checkout,
      paypalCapture: capture.result,
    });
  } catch (err) {
    console.error("❌ Full error stack:", err);

    const errorResponse = {
      error: "Payment processing failed",
      message: err.message,
    };

    if (err.name === "ValidationError") {
      errorResponse.type = "ValidationError";
      errorResponse.details = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json(errorResponse);
    }

    if (err.statusCode) {
      errorResponse.type = "PayPalAPIError";
      errorResponse.statusCode = err.statusCode;
      return res.status(err.statusCode).json(errorResponse);
    }

    res.status(500).json(errorResponse);
  }
};
exports.finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ error: "Checkout not found" });
    }

    // Already finalized? Just return success
    if (checkout.isFinalized) {
      return res.status(200).json({
        success: true,
        message: "Checkout already finalized",
      });
    }

    // For COD: allow finalizing even if not yet marked as paid
    if (checkout.paymentMethod !== "Cash on Delivery" && !checkout.isPaid) {
      return res.status(400).json({
        error: "Checkout is not paid",
      });
    }

    const finalOrder = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      paymentStatus:
        checkout.paymentMethod === "Cash on Delivery" ? "pending" : "paid",
      isPaid: checkout.paymentMethod === "Cash on Delivery" ? false : true,
      paidAt: checkout.paidAt || null,
      isDelivered: false,
      isFinalized: true,
      finalizedAt: Date.now(),
    });

    // Update Checkout as finalized
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    // Clear cart (if user exists)
    if (checkout.user) {
      await Cart.findOneAndDelete({ user: checkout.user });
    }

    return res.status(200).json({
      success: true,
      message: "Checkout finalized successfully",
      order: finalOrder,
    });
  } catch (error) {
    console.error("Finalize checkout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during finalize checkout",
    });
  }
};
