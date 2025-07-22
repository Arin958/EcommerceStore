import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
      >
        <div className="container mx-auto px-4 py-3 space-y-4">
          {["Home", "Shop", "Category", "About"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
              onClick={onClose}
            >
              {item}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="flex-1 py-2 text-indigo-600 font-medium border border-indigo-600 rounded-md text-center"
                onClick={onClose}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 py-2 bg-indigo-600 text-white font-medium rounded-md text-center"
                onClick={onClose}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileMenu;