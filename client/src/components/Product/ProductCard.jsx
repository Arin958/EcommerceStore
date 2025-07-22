import React from "react";
import { Link } from "react-router-dom";
import {
  Star as FaStar,
  Crown as FaCrown,
  Heart as FaHeart,
  FireExtinguisher,
  Clock,
} from "lucide-react";

const ProductCard = ({ product, variant = "default" }) => {
  // Determine badge based on variant
  const getBadge = () => {
    const baseClasses =
      "absolute top-3 left-3 text-white px-3 py-1 rounded-full flex items-center text-xs font-bold z-10 transition-all duration-300 shadow-md";

    switch (variant) {
      case "best-seller":
        return (
          <div
            className={`${baseClasses} bg-gradient-to-r from-red-500 to-orange-500 group-hover:opacity-0 group-hover:-translate-y-2`}
          >
            <FireExtinguisher className="mr-1" /> Best Seller
          </div>
        );
      case "new-arrival":
        return (
          <div
            className={`${baseClasses} bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:opacity-0 group-hover:-translate-y-2`}
          >
            <Clock className="mr-1" /> New
          </div>
        );

      case "trending":
        return (
          <div
            className={`${baseClasses} bg-gradient-to-r from-pink-500 to-red-500 group-hover:opacity-0 group-hover:-translate-y-2`}
          >
            <FaStar className="mr-1" /> Trending
          </div>
        );
      case "featured":
        return (
          <div
            className={`${baseClasses} bg-gradient-to-r from-purple-500 to-pink-500 group-hover:opacity-0 group-hover:-translate-y-2`}
          >
            <FaCrown className="mr-1" /> Featured
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 relative group border border-gray-100 hover:border-gray-200">
      {getBadge()}

      {/* Wishlist button */}
      <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-red-500 hover:text-white transition-colors duration-300 group-hover:opacity-100 opacity-0">
        <FaHeart className="text-gray-600 group-hover:text-white" />
      </button>

      <Link to={`/products/${product._id}`} className="block">
        {/* Image container with dynamic height and parallax effect */}
     <div className="relative h-60 md:h-64 overflow-hidden">
  <div className="absolute inset-0 overflow-hidden">
    <img
      loading="lazy"
      src={product.images?.[0]?.url.replace(
        "/upload/",
        "/upload/w_400,h_400,c_fill,q_auto,f_auto/"
      )}
      srcSet={`
        ${product.images?.[0]?.url.replace(
          "/upload/",
          "/upload/w_200,h_200,c_fill,q_auto,f_auto/"
        )} 200w,
        ${product.images?.[0]?.url.replace(
          "/upload/",
          "/upload/w_400,h_400,c_fill,q_auto,f_auto/"
        )} 400w
      `}
      sizes="(max-width: 768px) 200px, 400px"
      alt={product.name}
      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
      style={{
        objectPosition: "center center",
      }}
    />
  </div>

  {/* Gradient overlays */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-100"></div>
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>

        {/* Product info with slide-up effect */}
        <div className="p-5 transition-transform duration-500 group-hover:-translate-y-2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">
              {product.name}
            </h3>
            {product.discount && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  className={
                    i < product.rating ? "fill-current" : "fill-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">({product.reviews})</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-xl text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">Free shipping</span>
          </div>
        </div>

        {/* Hidden "View Details" button that slides up */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-5 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-gray-100">
          <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300">
            View Details
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
