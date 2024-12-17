import express from "express";
import router from "./router/router.js";
import connectDB from "./config/db.js";
import EmailValidation from "./validation/validation.js";
import { config } from "dotenv";

const app = express();
app.use(express.json());
config()
connectDB();
EmailValidation()

const port = process.env.PORT
app.use("/api", router);
app.listen(port, () => {
  console.log("server running");
});
