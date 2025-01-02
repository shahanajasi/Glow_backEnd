import mongoose from "mongoose";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

const postToPurchase = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;

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
      purchase.push({
        productId: product._id,
        quantity: 1,
      });
    }

    user.purchase = purchase;
    user.cart = cart;

    await user.save();

    res.status(201).json({
      message: "Product moved to purchase list and removed from cart",
      purchase,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPurchaseDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("userId:", userId); 
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }


    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$purchase" },
      {
        $lookup: {
          from: "products",
          localField: "purchase.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          username: 1,
          email: 1,
          productName: "$productDetails.name",
          productPrice: "$productDetails.price",
          quantity: "$purchase.quantity",
          totalPrice: { $multiply: ["$purchase.quantity", "$productDetails.price"] },
        },
      },
    ]);

    if (user.length === 0) {
      return res.status(404).json({ message: "No orders history found." });
    }

    res.status(200).json({ userPurchaseDetails: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { postToPurchase, getUserPurchaseDetails };
