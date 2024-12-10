import express from "express";
import {signUp,login} from "../controllers/userController.js";
import {getProducts, postProduct,} from "../controllers/productController.js";



const router = express.Router();
router.post("/register", signUp);
router.post("/login",login)
router.post("/postproduct",postProduct)
router.get("/getProduct",getProducts)
export default router;
