const express = require("express");
const router = express.Router();
const {
  getUserNotifications,
  markAsRead,
  deleteNotification,
} = require("../controller/notificationController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getUserNotifications);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteNotification);

module.exports = router;
