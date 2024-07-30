const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  listProducts,
  getProduct,
  getCart,
  addToCart,
  removeFromCart,
  publishProduct,
} = require("../controllers/storeController");

router.get("/products", listProducts);
router.get("/products/:id", getProduct);
router.get("/cart", authMiddleware, getCart);
router.post("/cart", authMiddleware, addToCart);
router.delete("/cart/:productId", authMiddleware, removeFromCart);
router.post("/publish", authMiddleware, publishProduct);

module.exports = router;
