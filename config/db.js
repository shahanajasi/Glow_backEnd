//import mongoose in express
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb://localhost:27017/glow"
    );
    console.log(`DB running ${connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
