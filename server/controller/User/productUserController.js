const Product = require("../../model/products/Product");
const mongoose = require("mongoose");

exports.getAllActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    });
  }
};

exports.getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid product id",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    const similarProducts = await Product.find({
      category: product.category,
      gender: product.gender,
      isActive: true,
      _id: { $ne: id },
    }).limit(4);

    res.status(200).json({
      success: true,
      similarProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
      isActive: true,
    });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getBestSeller = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    }).sort({
      sold: -1,
    });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid product id",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getTrendingProducts = async(req,res) => {
  try {
    const products = await Product.find({
      isActive: true,
    }).sort({
      views: -1,
    });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
 
exports.getCategory = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$category",
          firstProduct: { $first: "$$ROOT" },
          productCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          productCount: 1,
          image: {
            $arrayElemAt: ["$firstProduct.images.url", 0],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      categories,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    })
  }
};

exports.getSimilarProductByCategory = async(req,res) => {
  try {
    const category =req.params.category;
    const products = await Product.find({
      category: category,
      isActive: true,
    })

    res.status(200).json({
      success: true,
      products
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    })
  }
}
