// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  deleteCategory
} = require("../controller/categoryController");

const { protect } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/adminMiddleware");

// Public
router.get("/", getCategories);

// Admin only
router.post("/", protect, verifyAdmin, createCategory);
router.delete("/:id", protect, verifyAdmin, deleteCategory);

module.exports = router;
