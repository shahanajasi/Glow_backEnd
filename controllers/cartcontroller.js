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

const getCartAndCalculateTotal = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await User.aggregate([
      { $match: { _id: userId } },

      {
        $lookup: {
          from: "products",
          localField: "cart.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      { $unwind: "$cart" },

      { $unwind: "$productDetails" },

      {
        $addFields: {
          "cart.totalPrice": {
            $multiply: ["$cart.quantity", "$productDetails.price"],
          },
        },
      },

      {
        $group: {
          _id: "$_id",
          cart: { $push: "$cart" },
          totalPrice: { $sum: "$cart.totalPrice" },
          totalQuantity: { $sum: "$cart.quantity" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No cart found for this user" });
    }

    res.status(200).json({
      message:
        "Cart details, total price, and total quantity retrieved successfully",
      cart: result[0].cart,
      totalPrice: result[0].totalPrice,
      totalQuantity: result[0].totalQuantity,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { addToCart, getCartAndCalculateTotal };
