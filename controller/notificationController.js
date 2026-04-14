const Notification = require("../model/notificationModel");

/**
 * @desc    Get all notifications for the logged-in user
 * @route   GET /api/notifications
 * @access  Private
 */
exports.getUserNotifications = async (req, res) => {
  try {
    // Console check karne ke liye ki middleware se User ID aa rahi hai ya nahi
    console.log("Fetching notifications for User ID:", req.user._id); 

    // Sirf us user ki notifications fetch karein jo login hai aur unhe latest first sort karein
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Fetch Notification Error:", err.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

/**
 * @desc    Mark a specific notification as read
 * @route   PUT /api/notifications/:id
 * @access  Private
 */
exports.markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id, 
      { isRead: true }, 
      { new: true }
    );

    if (!notif) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(notif);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as read" });
  }
};

/**
 * @desc    Delete a specific notification
 * @route   DELETE /api/notifications/:id
 * @access  Private
 */
exports.deleteNotification = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndDelete(req.params.id);

    if (!notif) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
};