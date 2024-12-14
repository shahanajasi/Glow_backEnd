import mongoose from "mongoose";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;

    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    console.log(product);
    console.log(user);

    if (!product) {
      return res.status(401).json({ message: "Product Not Found" });
    }

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    let cart = user.cart || [];
    const existingProduct = cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ productId: product._id, quantity: 1 });
    }

    user.cart = cart;
    await user.save();

    res.status(201).json({ message: "Product added to the cart", cart });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default addToCart;
