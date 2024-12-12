import express from "express";
import { signUp, login } from "../controllers/userController.js";
import { getProducts, gettingIDwise, postProduct } from "../controllers/productController.js";
import checkauth from "../middleware/checkauth.js";

const router = express.Router();
router.post("/register", signUp);
router.post("/login", login);
router.post("/postproduct", postProduct);
router.get("/getProduct",checkauth, getProducts);
router.get("/:id",gettingIDwise)
export default router;
