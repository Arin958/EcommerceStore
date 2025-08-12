import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCart,
  removeFromCart,
} from "../../store/Cart/cartSlice";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { cart, loading, error } = useSelector((state) => state.cart);

  // Handle nested cart response

  const products = cart.products || [];

  // Get guestId from localStorage if user not logged in
  const guestId = user?._id || localStorage.getItem("guestId");

  useEffect(() => {
    if (isOpen) {
      dispatch(getCart(guestId));
    }
  }, [dispatch, guestId]);

  const itemCount = products.reduce((total, item) => total + item.quantity, 0);
  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    navigate(user ? "/checkout" : "/login");
  };

const handleUpdateQuantity = (productId, newQuantity, size, gender) => {
  if (newQuantity < 1) return;
  dispatch(
    updateCart({
      guestId,
      productId,
      size,
      gender,
      quantity: newQuantity,
    })
  );
  // Remove this line: .then(() => { dispatch(getCart(guestId)); });
};

const handleRemoveItem = (productId, size, gender) => {
  dispatch(
    removeFromCart({
      guestId,
      productId,
      size,
      gender,
    })
  );
  // Remove this line: .then(() => { dispatch(getCart(guestId)); });
};

// Instead, refresh cart when drawer opens or at intervals
useEffect(() => {
  if (isOpen) {
    dispatch(getCart(guestId));
  }
}, [dispatch, guestId, isOpen]); 

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay with gradient matching announcement bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl"
          >
            <div className="h-full flex flex-col bg-white">
              {/* Gradient Header matching announcement bar */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="h-6 w-6 text-white" />
                    <h2 className="text-xl font-bold text-white">
                      Your Shopping Bag
                    </h2>
                    <span className="ml-2 text-sm bg-white/20 text-white px-2 py-1 rounded-full">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Close cart"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {itemCount > 0 ? (
                  <div className="space-y-4">
                    {products.map((item, index) => (
                      <motion.div
                        key={item.productId || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            loading="lazy"
                            src={item.image || item.images}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <button
                              onClick={() =>
                                handleRemoveItem(
                                  item.productId,
                                  item.size,
                                  item.gender
                                )
                              }
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {[item.color, item.size]
                              .filter(Boolean)
                              .join(" / ") || "One size"}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-indigo-600">
                              ${item.price.toFixed(2)}
                            </span>
                            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-2 py-1">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.productId,
                                    item.quantity - 1,
                                    item.size,
                                    item.gender
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className={`p-1 rounded-full ${
                                  item.quantity <= 1
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-600 hover:bg-gray-200"
                                }`}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm w-6 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.productId,
                                    item.quantity + 1,
                                    item.size,
                                    item.gender
                                  )
                                }
                                className="p-1 rounded-full text-gray-600 hover:bg-gray-200"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="relative mb-6">
                      <ShoppingBag className="h-16 w-16 text-gray-200" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <X className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Your cart feels lonely
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Your shopping bag is empty. Let's find something special!
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-200"
                    >
                      Start Shopping
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Checkout Footer */}
              {itemCount > 0 && (
                <div className="border-t border-gray-200 p-4 bg-white shadow-lg">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span
                        className={
                          subtotal > 50
                            ? "text-green-600 font-medium"
                            : "text-gray-600"
                        }
                      >
                        {subtotal > 50 ? "FREE" : "$5.99"}
                      </span>
                    </div>
                    {subtotal < 50 && (
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${(subtotal / 50) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-full font-bold transition-all shadow-lg hover:shadow-indigo-200"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  {subtotal < 50 && (
                    <p className="mt-3 text-xs text-center text-gray-500">
                      Add{" "}
                      <span className="font-bold text-indigo-600">
                        ${(50 - subtotal).toFixed(2)}
                      </span>{" "}
                      more for free shipping
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
