const Notification = require("../../model/Notification/Notification");

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch notifications" });
  }
};

// In your notification controller
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to mark notifications as read" });
  }
};