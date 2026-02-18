const AuditLog = require("../models/AuditLog");

// Get all audit logs (admin only)
const getAuditLogs = async (req, res, next) => {
  try {
    const { action, userId } = req.query;

    // Build filter object
    let filter = {};

    if (action) {
      filter.action = action;
    }

    if (userId) {
      filter.targetUser = userId;
    }

    // Fetch logs with optional filters, and populate user details
    const logs = await AuditLog.find(filter)
      .populate("performedBy", "name email role")
      .populate("targetUser", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAuditLogs,
};
