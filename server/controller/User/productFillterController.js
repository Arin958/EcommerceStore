// controllers/productController.js

const Product = require("../../model/products/Product");

const getFilteredProducts = async (req, res) => {
  try {
    // Accept singular or plural for brand and others for flexibility
    const {
      category,
      gender,
      minPrice,
      maxPrice,
      colors,
      sizes,
      brand,   // singular, from frontend query param
      collection,
      sortBy,
      search,
      isFeatured,
      newArrivals,
      bestSellers,
      limit,
    } = req.query;

    // For multi-value filters, normalize into arrays:
    const brands = brand ? (Array.isArray(brand) ? brand : [brand]) : undefined;
    const categories = category ? (Array.isArray(category) ? category : [category]) : undefined;
    const genders = gender ? (Array.isArray(gender) ? gender : [gender]) : undefined;
    const colorsArr = colors ? (Array.isArray(colors) ? colors : [colors]) : undefined;
    const sizesArr = sizes ? (Array.isArray(sizes) ? sizes : [sizes]) : undefined;
    const collectionsArr = collection ? (Array.isArray(collection) ? collection : [collection]) : undefined;

    // Base query
    let query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    if (categories) query.category = { $in: categories };
    if (genders) query.gender = { $in: genders };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (colorsArr) query.colors = { $in: colorsArr };
    if (sizesArr) query.sizes = { $in: sizesArr };
    if (brands) query.brand = { $in: brands };
    if (collectionsArr) query.collections = { $in: collectionsArr };

    if (isFeatured === "true") query.isFeatured = true;

    if (newArrivals === "true") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query.createdAt = { $gte: thirtyDaysAgo };
    }

    if (bestSellers === "true") query.sold = { $gt: 0 };

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

    let productsQuery = Product.find(query).sort(sortOption);

    if (limit) productsQuery = productsQuery.limit(Number(limit));

    const products = await productsQuery.exec();

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