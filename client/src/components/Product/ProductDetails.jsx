import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchSimilarProducts,
} from "../../store/User/productUser";

import {
  ShoppingBag as FaShoppingBag,
  Star as FaStar,
  Heart as FaHeart,
  Share,
} from "lucide-react";

import { ChevronRight as IoIosArrowForward } from "lucide-react";
import { toast } from "react-toastify";
import { addToCart } from "../../store/Cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, similarProducts } = useSelector(
    (state) => state.productUser
  );

  const { user, guestId } = useSelector((state) => state.auth);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const userId = user ? user._id : guestId;

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchSimilarProducts(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        size: selectedSize,
        quantity,
        userId,
      })
    );

    toast.success("Product added to cart");
  };

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              Home
            </Link>
            <IoIosArrowForward className="text-gray-400" />
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              Shop
            </Link>
            <IoIosArrowForward className="text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
              <img
                loading="lazy"
                src={product.images[selectedImage]?.url}
                alt={product.name}
                className="w-full h-96 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-5 gap-3 mt-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index
                      ? "border-indigo-600"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    loading="lazy"
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.ratings.average)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 ml-2">
                    ({product.ratings.count} reviews)
                  </span>
                  <span className="ml-4 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <FaHeart className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              {product.discountPrice > 0 ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 mr-4">
                    ${product.discountPrice}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price}
                  </span>
                  <span className="ml-4 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {Math.round(
                      (1 - product.discountPrice / product.price) * 100
                    )}
                    % OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-indigo-600 ring-2 ring-indigo-200"
                        : "border-gray-200"
                    } transition-all`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-5 gap-2 max-w-xs">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-2 border rounded-md text-center text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "hover:bg-gray-100 border-gray-200"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg mr-4">
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900">{quantity}</span>
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <span className="text-gray-500 text-sm">
                {product.stock} available
              </span>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <FaShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
              <button className="flex items-center hover:text-indigo-600">
                <Share className="h-4 w-4 mr-2" />
                Share
              </button>
              <span>SKU: {product._id.slice(-6).toUpperCase()}</span>
              <span>Category: {product.category}</span>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                You may also like
              </h2>
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                View all <IoIosArrowForward className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow hover:-translate-y-1"
                >
                  <div className="relative">
                    <div className="p-4">
                      <img
                        loading="lazy"
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full h-48 object-contain"
                      />
                    </div>
                    {product.discountPrice > 0 && (
                      <span className="absolute top-4 left-4 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                        {Math.round(
                          (1 - product.discountPrice / product.price) * 100
                        )}
                        % OFF
                      </span>
                    )}
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                      <FaHeart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-4 border-t">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.ratings.average)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-xs ml-1">
                        ({product.ratings.count})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">
                        $
                        {product.discountPrice > 0
                          ? product.discountPrice
                          : product.price}
                      </span>
                      {product.discountPrice > 0 && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
