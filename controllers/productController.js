import Product from "../models/productSchema.js";
// import User from "../models/userSchema.js";
import { ObjectId } from "mongoose";

const postProduct = async (req, res) => {
  try {
    const { id, name, price, description, category ,quantity} = req.body;

    const newProduct = new Product({ id, name, price, description, category ,quantity});
    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

const gettingIDwise = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  try {
    const product = await Product.findById(productId);
    console.log(product);
    if (product) {
      return res.status(200).json({ message: "Product found", data: product });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const gettingQuerywise = async (req, res) => {
  const productCategory = req.query.category;

  if (!productCategory) {
    return res.status(400).json({ message: "Category query parameter is required" });
  }

  console.log("Category:", productCategory);

  try {
    const products = await Product.find({ category: productCategory });
    console.log("Query object:", { category: products });

    if (products.length > 0) {
      return res
        .status(200)
        .json({ message: "Products found", data: products });
    } else {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export { getProducts, postProduct, gettingIDwise, gettingQuerywise };
