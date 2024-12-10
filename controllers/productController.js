import Product from "../models/productSchema.js";

const postProduct = async (req, res) => {
    try {
      const { name, price, description, category } = req.body;
  
      const newProduct = new Product({ name, price, description, category });
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

export {getProducts,postProduct};
