import express from "express";
import router from "./router/router.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api", router);
app.listen(3000, () => {
  console.log("server running");
});
