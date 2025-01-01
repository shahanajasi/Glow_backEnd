import express from "express";
import { signUp, login } from "../controllers/userController.js";
import { getProducts, gettingIDwise, gettingQuerywise, postProduct } from "../controllers/productController.js";
import checkauth from "../middleware/checkauth.js";
import { addToCart, getCartAndCalculateTotal} from "../controllers/cartcontroller.js";
import addToWishList from "../controllers/wishListController.js";
import postToPurchase from "../controllers/purchaseController.js";
import { adminLogin, adminSignUp } from "../controllers/adminController.js";
import authorizeAdmin from "../middleware/adminmiddleware.js";
import { admincreateproduct, admindeleteaproductbyid, adminGetAllUsers, admingetproductbyid, admingetproductbyquery, admingetUserById, adminupdateaproductbyid, getadminTotalProductsPurchased } from "../controllers/adminUserController.js";
import adminproduct from "../middleware/adminproduct.js";

const router = express.Router();
router.post("/register", signUp);
router.post("/login", login);
router.post("/adminSignup",adminSignUp)
router.post("/adminLogin",adminLogin)
router.post("/admincreateproduct",adminproduct,admincreateproduct)
router.post("/postproduct", postProduct);
router.post("/addToCart/:userId",addToCart)
router.post("/addToWishList/:userId",addToWishList)
router.get("/getadminTotalProductsPurchased",authorizeAdmin,getadminTotalProductsPurchased)
router.get("/admingetAllUsers",authorizeAdmin,adminGetAllUsers)
router.get("/admingetuserbyId/:id",authorizeAdmin,admingetUserById)
router.get("/admingetproductbyquery/query",authorizeAdmin,admingetproductbyquery)
router.get("/admingetproductbyid/:id",authorizeAdmin,admingetproductbyid)
router.get("/getProduct",checkauth, getProducts);
router.get("/query",gettingQuerywise)
router.get("/:id",gettingIDwise)
router.get("/getCartandCalculateTotal/:userId",getCartAndCalculateTotal)
router.post("/purchase/:userId",postToPurchase)
router.delete("/admindeleteaproductbyid/:id",adminproduct,admindeleteaproductbyid)
router.put("/adminupdateaproductbyid/:id",adminproduct,adminupdateaproductbyid)
export default router;
