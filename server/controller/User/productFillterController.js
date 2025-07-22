// controllers/productController.js

const Product = require("../../model/products/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const {
      category,
      gender,
      minPrice,
      maxPrice,
      colors,
      sizes,
      brands,
      collections,
      sortBy,
      search,
      isFeatured,
      newArrivals,
      bestSellers,
      limit,
    } = req.query;

    // Base query
    let query = { isActive: true };

    // Text search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter
    if (category) {
      query.category = { $in: Array.isArray(category) ? category : [category] };
    }

    // Gender filter
    if (gender) {
      query.gender = { $in: Array.isArray(gender) ? gender : [gender] };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Color filter
    if (colors) {
      query.colors = { $in: Array.isArray(colors) ? colors : [colors] };
    }

    // Size filter
    if (sizes) {
      query.sizes = { $in: Array.isArray(sizes) ? sizes : [sizes] };
    }

    // Brand filter
    if (brands) {
      query.brand = { $in: Array.isArray(brands) ? brands : [brands] };
    }

    // Collection filter
    if (collections) {
      query.collections = { $in: Array.isArray(collections) ? collections : [collections] };
    }

    // Featured products
    if (isFeatured === "true") {
      query.isFeatured = true;
    }

    // New arrivals (last 30 days)
    if (newArrivals === "true") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query.createdAt = { $gte: thirtyDaysAgo };
    }

    // Best sellers (top sold products)
    if (bestSellers === "true") {
      query.sold = { $gt: 0 };
    }

    // Sorting
    let sortOption = {};
    switch (sortBy) {
      case "price-low":
        sortOption = { price: 1 };
        break;
      case "price-high":
        sortOption = { price: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "rating":
        sortOption = { "ratings.average": -1 };
        break;
      case "popular":
        sortOption = { sold: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Execute query
    let productsQuery = Product.find(query).sort(sortOption);

    // Limit results
    if (limit) {
      productsQuery = productsQuery.limit(Number(limit));
    }

    const products = await productsQuery.exec();

    // Get available filter options for the current results
    const filters = {
      categories: await Product.distinct("category", query),
      genders: await Product.distinct("gender", query),
      brands: await Product.distinct("brand", query),
      colors: await Product.distinct("colors", query),
      sizes: await Product.distinct("sizes", query),
      collections: await Product.distinct("collections", query),
      priceRange: await Product.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            min: { $min: "$price" },
            max: { $max: "$price" },
          },
        },
      ]),
    };

    res.json({
      success: true,
      count: products.length,
      filters,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getFilteredProducts };