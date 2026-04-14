const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers  // ✅ Add this line
} = require("../controller/authController");
const { protect, authorize } = require('../middleware/authMiddleware');

router.get("/admin/users", protect, authorize("Admin"), getAllUsers);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/admin/users', protect, authorize('Admin'), getAllUsers);

module.exports = router;