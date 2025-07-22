// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },

    price: {
      type: Number,
      required: true,
    },
    discountPrice: Number, // optional
    sku: {
      type: String,
      unique: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    colors: [String], // e.g., ["red", "blue", "green"]
    sizes: [String], // e.g., ["S", "M", "L", "XL"]
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
        },
      },
    ], // Cloudinary URLs

    collections: {
      type: String,
      required: true,
    }, // e.g., ["Featured", "Trending"]

    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin or seller
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;