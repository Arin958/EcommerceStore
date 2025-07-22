import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "./ProductCard";

import { fetchBestSellers } from "../../store/User/productUser";
import { useNavigate } from "react-router-dom";

const BestSellers = ({ limit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bestSellers, loading, error } = useSelector(
    (state) => state.productUser
  );

  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  if (loading)
    return <div className="text-center py-8">Loading best sellers...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  // Handle case when bestSellers is empty or undefined
  if (!bestSellers || bestSellers.length === 0) {
    return null;
  }

  const displayBestSellers = limit ? bestSellers.slice(0, limit) : bestSellers;
  return (
    <section className="my-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Best Sellers
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayBestSellers.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              variant="best-seller"
            />
          ))}
        </div>

        {limit && bestSellers.length > limit && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1"
            >
              View More Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
