import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

const SearchBar = ({ searchOpen, onClose }) => (
  <>
    {/* Mobile Search */}
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 overflow-hidden"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Desktop Search Overlay */}
    {searchOpen && (
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose}>
        <div className="container mx-auto px-4 pt-24" onClick={(e) => e.stopPropagation()}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-2xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              className="w-full px-6 py-4 pl-14 text-lg border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            <Search className="absolute left-5 top-5 text-gray-400 text-xl" />
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    )}
  </>
);

export default SearchBar;