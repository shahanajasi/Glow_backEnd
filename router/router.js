import express from "express";
import { signUp, login } from "../controllers/userController.js";
import { getProducts, gettingIDwise, gettingQuerywise, postProduct } from "../controllers/productController.js";
import checkauth from "../middleware/checkauth.js";
import { addToCart, getCartAndCalculateTotal} from "../controllers/cartcontroller.js";
import addToWishList from "../controllers/wishListController.js";
import postToPurchase from "../controllers/purchaseController.js";
import { adminLogin, adminSignUp } from "../controllers/adminController.js";
import adminGetAllUsers from "../controllers/adminUserController.js";

const router = express.Router();
router.post("/register", signUp);
router.post("/login", login);
router.post("/adminSignup",adminSignUp)
router.post("/adminLogin",adminLogin)
router.post("/postproduct", postProduct);
router.post("/addToCart/:userId",addToCart)
router.post("/addToWishList/:userId",addToWishList)
router.get("/getAllUsers/:id",adminGetAllUsers)
router.get("/getProduct",checkauth, getProducts);
router.get("/query",gettingQuerywise)
router.get("/:id",gettingIDwise)
router.get("/getCartandCalculateTotal/:userId",getCartAndCalculateTotal)
router.post("/purchase/:userId",postToPurchase)
export default router;
