import express from "express";
import { signUp, login } from "../controllers/userController.js";
import {
  getProducts,
  gettingIDwise,
  gettingQuerywise,
  postProduct,
} from "../controllers/productController.js";
import checkauth from "../middleware/checkauth.js";
import {
  addToCart,
  getCartAndCalculateTotal,
} from "../controllers/cartcontroller.js";
import addToWishList from "../controllers/wishListController.js";
import {getUserPurchaseDetails, postToPurchase} from "../controllers/purchaseController.js";
import { adminLogin, adminSignUp } from "../controllers/adminController.js";
import authorizeAdmin from "../middleware/adminmiddleware.js";
import {
  admincreateproduct,
  admindeleteaproductbyid,
  adminGetAllUsers,
  admingetproductbyid,
  admingetproductbyquery,
  admingetUserById,
  adminupdateaproductbyid,
  getadminTotalProductsPurchased,
  getAdminTotalRevenue,
  getTotalOrders,
} from "../controllers/adminUserController.js";

import adminproduct from "../middleware/adminproduct.js";

const router = express.Router();

//user//

router.post("/register", signUp);
router.post("/login", login);
router.post("/postproduct", postProduct);
router.post("/addToCart/:userId", addToCart);
router.post("/addToWishList/:userId", addToWishList);
router.post("/purchase/:userId",postToPurchase);
router.get("/getProduct", checkauth, getProducts);
router.get("/query", gettingQuerywise);
router.get("/:id", gettingIDwise);
router.get("/getUserPurchaseDetails",checkauth,getUserPurchaseDetails)
router.get("/getCartandCalculateTotal/:userId", getCartAndCalculateTotal);

//admin//

router.get("/getTotalOrders",authorizeAdmin,getTotalOrders)
router.post("/adminSignup", adminSignUp);
router.post("/adminLogin", adminLogin);
router.post("/admincreateproduct", adminproduct, admincreateproduct);
router.get(
    "/getadminTotalProductsPurchased",
    authorizeAdmin,
    getadminTotalProductsPurchased
  );
router.get("/getAdminTotalRevenue", authorizeAdmin, getAdminTotalRevenue);
router.get("/admingetAllUsers", authorizeAdmin, adminGetAllUsers);
router.get("/admingetuserbyId/:id", authorizeAdmin, admingetUserById);
router.get(
  "/admingetproductbyquery/query",
  authorizeAdmin,
  admingetproductbyquery
);
router.get("/admingetproductbyid/:id", authorizeAdmin, admingetproductbyid);
router.delete(
  "/admindeleteaproductbyid/:id",
  adminproduct,
  admindeleteaproductbyid
);
router.put(
  "/adminupdateaproductbyid/:id",
  adminproduct,
  adminupdateaproductbyid
);
export default router;
