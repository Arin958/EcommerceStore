const Product = require("../../model/products/Product");
const cloudinary = require("../../utils/cloudinary");
const slugify = require("slugify");

exports.fetchAllProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      sku,
      stock,
      colors,
      sizes,
      gender,
      collections,
      isFeatured,
      isActive,
    } = req.body;

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve({
                  url: result.secure_url,
                  alt: name,
                });
              }
            }
          )
          .end(file.buffer)
          .on("error", (error) => {
            reject(error);
          });
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const newProduct = new Product({
      name,
      slug: slugify(name),
      description,
      brand,
      category,
      price,
      discountPrice: discountPrice || 0,
      sku,
      stock,
      colors: colors ? JSON.parse(colors) : [],
      sizes: sizes ? JSON.parse(sizes) : [],
      gender,
      collections,
      isFeatured: isFeatured === "true",
      isActive: isActive === "true",
      images: uploadedImages,
      user: req.user._id,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to create product",
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      sku,
      stock,
      colors,
      sizes,
      collections,
      isFeatured,
      isActive,
      existingImages = [],
    } = req.body;

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Upload new images (if any)
    let newImages = [];
    const files = req.files;

    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { resource_type: "image", folder: "products" },
              (error, result) => {
                if (error) return reject(error);
                resolve({
                  url: result.secure_url,
                  alt: name,
                });
              }
            )
            .end(file.buffer);
        });
      });

      newImages = await Promise.all(uploadPromises);
    }

    // Ensure existingImages is an array
    const parsedExistingImages = Array.isArray(existingImages)
      ? existingImages
      : typeof existingImages === "string"
      ? [existingImages]
      : [];

    const mergedImages = [
      ...parsedExistingImages.map((url) => ({ url, alt: name })),
      ...newImages,
    ];

    // Update fields
    if (name) {
      product.name = name;
      product.slug = slugify(name);
    }
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (sku) product.sku = sku;
    if (stock !== undefined) product.stock = stock;

    // Safe parse for arrays
    const safeParseJSON = (value) => {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    };

    if (colors) product.colors = safeParseJSON(colors);
    if (sizes) product.sizes = safeParseJSON(sizes);

    if (collections) product.collections = collections;
    if (isFeatured !== undefined) product.isFeatured = isFeatured === "true";
    if (isActive !== undefined) product.isActive = isActive === "true";

    if (mergedImages.length > 0) product.images = mergedImages;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Edit product error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    for (let image of product.images) {
      const publicId = image.url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }
    res
      .status(200)
      .json({
        message: "Product deleted successfully",
        deletedProduct: { _id: product._id },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
