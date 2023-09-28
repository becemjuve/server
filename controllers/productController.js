const cloudinary = require("../config/cloudinaryConfig.js");
const Product = require("../models/ProductModel");

// create new product ===> product/new
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, rating, category, stock } = req.body;

    // Check if required fields are missing
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "product required fields." });
    }
    if (!req.body.image)
      return res.status(400).json({ message: "Please choose an image" });

    const uploadRes = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: "alphaShop",
    });

    const { public_id, secure_url } = uploadRes;
    req.body.image = { public_id, secure_url };
    const product = await Product.create(req.body);
    res.json({ message: "Product created successufly" });
  } catch (error) {}
};

// get all product ===> /products/all

exports.getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {}
};

// get one product
exports.getOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json({ product });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// update a product

exports.updateOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      product: updatedProduct,
      message: "Product updated successufly",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a product

exports.deleteOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Use findByIdAndRemove to delete the product by ID
    const deletedProduct = await Product.findByIdAndRemove(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
