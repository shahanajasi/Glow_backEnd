import mongoose from "mongoose";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

const postToPurchase = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;

    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    let purchase = user.purchase || [];
    let cart = user.cart || [];

    cart = cart.filter((item) => item.productId.toString() !== productId);

    const existingProduct = purchase.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      purchase.push(cart);
    }

    user.purchase = purchase;
    user.cart = cart;

    await user.save();

    res.status(201).json({
      message: "Product moved to purchase list and removed from cart",
      purchase,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default postToPurchase;
