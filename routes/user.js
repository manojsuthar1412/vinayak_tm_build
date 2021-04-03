const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
  getAllUsers,
  removeUser,
} = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", getUser);
router.get("/users", getAllUsers);

router.put("/user/:userId/", isSignedIn, updateUser);

router.put(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

router.delete("/user/:userId", isSignedIn, removeUser);

module.exports = router;
