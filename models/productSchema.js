import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  quantity:{
    type:Number,
    required :true,
    trim:true
  }
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
