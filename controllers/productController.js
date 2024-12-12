import Product from "../models/productSchema.js";
// import User from "../models/userSchema.js";
import { ObjectId } from "mongoose";

const postProduct = async (req, res) => {
  try {
    const {id, name, price, description, category } = req.body;

    const newProduct = new Product({ id,name, price, description, category });
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
    const product = await Product.findById(productId );
    console.log(product)
    if (product) {
      return res.status(200).json({ message: "Product found", data: product });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getProducts, postProduct, gettingIDwise };
