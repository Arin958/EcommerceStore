import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearCart, getCart } from "../../../../store/Cart/cartSlice";
import { useState } from "react";
import CartDrawer from "../../../Cart/CartDrawer";
import { logout } from "../../../../store/Auth/auth";

import { persist } from "../../../../store/store";
// adjust path as needed

const Icons = ({ onSearchClick, onCartClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const shouldFetchCart = user?._id || localStorage.getItem("guestId");
    if (shouldFetchCart) {
      dispatch(getCart(shouldFetchCart));
    }
  }, [dispatch, user?._id]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      // 1. Call logout API and Redux
      await dispatch(logout()).unwrap();

      // 2. Clear cart from Redux state
      dispatch(clearCart());

      // 3. Remove guestId if present
      localStorage.removeItem("guestId");

      // 4. Purge persisted state
      await persist.purge();

      // 5. Navigate to login
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Wishlist Icon */}
        <button
          onClick={onCartClick}
          className="p-2 text-gray-600 hover:text-indigo-600 transition relative"
        >
          <ShoppingBag className="h-5 w-5" />
          {cart?.products?.length > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {cart.products.length}
            </span>
          )}
        </button>

        {/* Conditional Rendering Based on Login */}
        {user ? (
          <div className="relative group">
            <button className="p-2 text-gray-600 hover:text-indigo-600 transition">
              <User className="h-5 w-5" />
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-10">
              <Link
                to="/account"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <Link
                to="/order-list"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Orders
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="p-2 text-gray-600 hover:text-indigo-600 transition text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="p-2 text-gray-600 hover:text-indigo-600 transition text-sm font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Icons;
