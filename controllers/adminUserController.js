import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

const adminGetAllUsers = async (req, res) => {
  try {
    console.log("Test ok");
    const users = await User.find();

    if (users.length === 0) {
      console.log(users);
      return res.status(404).json({ message: "No users found" });
    }

    return res
      .status(200)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const admingetUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  try {
    const userData = await User.findById(userId);
    console.log(userData);
    if (userData) {
      return res.status(200).json({ message: "user found", data: userData });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const admingetproductbyquery = async (req, res) => {
  const productCategory = req.query.category;

  if (!productCategory) {
    return res
      .status(400)
      .json({ message: "Category query parameter is required" });
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

const admingetproductbyid = async (req, res) => {
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

const admincreateproduct = async (req, res) => {
  try {
    const { id, name, price, description, category } = req.body;

    const newProduct = new Product({ id, name, price, description, category });
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

const admindeleteaproductbyid = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    const deleteproduct = await Product.findByIdAndDelete(productId);

    if (!deleteproduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully!",
      product: deleteproduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

const adminupdateaproductbyid = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getadminTotalProductsPurchased = async (req, res) => {
    try {
        const result = await User.aggregate([
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
            $group: {
                _id: "$_id",
                username: { $first: "$username" },
                productsPurchased: {
                  $push: {
                    productId: "$productDetails._id",
                    productName: "$productDetails.name",
                    quantity: "$purchase.quantity",
                    price:"$productDetails.price",
                    totalPrice: { $multiply: ["$purchase.quantity", "$productDetails.price"] }, 
                  },
                },
            },
          },
        ]);
    
        res.status(200).json({ totalProductsPurchasedByAllUsers: result });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
  

export {
  adminGetAllUsers,
  admingetUserById,
  admingetproductbyquery,
  admingetproductbyid,
  admincreateproduct,
  admindeleteaproductbyid,
  adminupdateaproductbyid,
  getadminTotalProductsPurchased
};
