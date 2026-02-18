const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

// Get all users (admin only)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude password

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    // Pass error to global error handler
    next(error);
  }
};

// Promote user to admin
const promoteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.role = "admin";
    await user.save();

    // Create audit log entry
    await AuditLog.create({
      action: "PROMOTE_USER",
      performedBy: req.user._id,
      targetUser: user._id,
    });

    user.password = undefined; // Exclude password from response

    res.status(200).json({
      success: true,
      message: "User promoted to admin successfully",
      user,
    });
  } catch (error) {
    // Pass error to global error handler
    next(error);
  }
};

// Block a user
const blockUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.isBlocked = true;
    await user.save();

    // Create audit log entry
    await AuditLog.create({
      action: "BLOCK_USER",
      performedBy: req.user._id,
      targetUser: user._id,
    });

    user.password = undefined; // Exclude password from response

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      user,
    });
  } catch (error) {
    // Pass error to global error handler
    next(error);
  }
};

module.exports = {
  getAllUsers,
  promoteUser,
  blockUser,
};
