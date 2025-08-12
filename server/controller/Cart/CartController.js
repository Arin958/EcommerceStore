const jwt = require("jsonwebtoken");
const Product = require("../../model/products/Product");
const Cart = require("../../model/Cart/Cart");
const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    return null;
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, size, gender, quantity, guestId } = req.body;
    const userId = getUserIdFromToken(req);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    if (size && !product.sizes.includes(size)) {
      return res.status(400).json({ message: "Invalid size", success: false });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Out of stock", success: false });
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      size,
      gender,
      quantity,
      price: product.discountPrice || product.price,
      image: product.images[0]?.url || "",
    };

    let cart;

    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    }

    if (!cart) {
      cart = new Cart({
        products: [cartItem],
        totalPrice: cartItem.price * cartItem.quantity,
      });

      if (userId) cart.user = userId;
      if (guestId) cart.guestId = guestId; // ✅ Ensure guestId is assigned
    } else {
      const existingItem = cart.products.find(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.gender === gender
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.products.push(cartItem);
      }

      cart.totalPrice = Math.round(
        cart.products.reduce((total, item) => total + item.price * item.quantity, 0)
      );
    }

    console.log("Saving cart for guestId:", cart.guestId);
    await cart.save();

    res.status(200).json({ message: "Product added to cart", success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


exports.getCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { guestId } = req.query;

    let cart;

    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    } else {
      return res.status(200).json({
        success: true,
        cart: { products: [], totalPrice: 0 },
      });
    }

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { products: [], totalPrice: 0 },
      });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

exports.updateCartItems = async (req, res) => {
  try {
    let { productId, size, gender, quantity, guestId } = req.body;
    const userId = getUserIdFromToken(req);

    // Normalize
    size = size ? size.toLowerCase() : "";
    gender = gender ? gender.toLowerCase() : "";

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0", success: false });
    }

    let cart;
    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    }

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: "Out of stock" });
    }

    const itemIndex = cart.products.findIndex((item) => {
      const itemSize = (item.size || "").toLowerCase();
      const itemGender = (item.gender || "").toLowerCase();
      return (
        item.productId.toString() === productId &&
        itemSize === size &&
        itemGender === gender
      );
    });

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    cart.products[itemIndex].quantity = quantity;

    cart.totalPrice = Math.round(
      cart.products.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    let { productId, size, gender, guestId } = req.body;
    const userId = getUserIdFromToken(req);

    // Normalize
    size = size ? size.toLowerCase() : "";
    gender = gender ? gender.toLowerCase() : "";

    let cart;
    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    }

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const initialLength = cart.products.length;

    cart.products = cart.products.filter((item) => {
      const itemSize = (item.size || "").toLowerCase();
      const itemGender = (item.gender || "").toLowerCase();
      return (
        item.productId.toString() !== productId ||
        itemSize !== size ||
        itemGender !== gender
      );
    });

    cart.totalPrice = Math.round(
      cart.products.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    if (cart.products.length === 0) {
      // Delete only if empty
      await cart.deleteOne();
    } else {
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: `${initialLength - cart.products.length} item(s) removed from cart`,
      cart: cart.products.length > 0 ? cart : { products: [], totalPrice: 0 },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};


exports.mergeCarts = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const { guestId } = req.body;
    if (!guestId) {
      return res.status(400).json({ message: "Guest ID is required", success: false });
    }

    console.log("🔍 Merging cart for guestId:", guestId);

    const [userCart, guestCart] = await Promise.all([
      Cart.findOne({ user: userId }),
      Cart.findOne({ guestId }),
    ]);

    if (!userCart && guestCart) {
      guestCart.user = userId;
      guestCart.guestId = undefined;
      await guestCart.save();
      return res.status(200).json({
        success: true,
        message: "Guest cart merged with user cart",
        cart: guestCart,
      });
    }

    if (!guestCart && userCart) {
      return res.status(200).json({
        success: true,
        message: "User cart exists, nothing to merge",
        cart: userCart,
      });
    }

    if (!guestCart && !userCart) {
      return res.status(200).json({
        success: true,
        message: "No carts to merge",
        cart: { products: [], totalPrice: 0 },
      });
    }

    guestCart.products.forEach((guestItem) => {
      const existingItem = userCart.products.find(
        (userItem) =>
          userItem.productId.toString() === guestItem.productId.toString() &&
          userItem.size === guestItem.size &&
          userItem.gender === guestItem.gender
      );

      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        userCart.products.push(guestItem);
      }
    });

    userCart.totalPrice = Math.round(
      userCart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );

    await Promise.all([
      userCart.save(),
      Cart.findOneAndDelete({ guestId }), // delete guest cart
    ]);

    res.status(200).json({
      success: true,
      message: "Carts merged successfully",
      cart: userCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
