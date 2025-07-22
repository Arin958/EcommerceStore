import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategory } from "../../store/User/productUser";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category } = useSelector((state) => state.productUser);
  const categoryProducts = category?.categories;

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoryProducts?.map((category) => (
          <div
            key={category.category}
            className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => handleCategoryClick(category.category)}
          >
            <div className="h-48 w-full relative overflow-hidden">
              <img
                loading="lazy"
                src={category.image}
                alt={category.category}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-1">{category.category}</h3>
              <p className="text-sm opacity-90">
                {category.productCount}{" "}
                {category.productCount === 1 ? "product" : "products"}
              </p>
              <button className="mt-3 px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
