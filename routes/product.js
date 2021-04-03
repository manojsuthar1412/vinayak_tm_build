const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  getPhoto,
  updateProduct,
  removeProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//PARAMS
router.param("userId", getUserById);
router.param("productId", getProductById);

//Actual Routes

//Create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//Read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);

//Update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//Delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

//listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
