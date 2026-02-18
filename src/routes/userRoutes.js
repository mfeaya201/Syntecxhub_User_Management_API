const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  getAllUsers,
  promoteUser,
  blockUser,
} = require("../controllers/userControllers");

const router = express.Router();

/**
 * Admin-only routes for user management
 */

// Get all users
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

// Promote user to admin
router.put(
  "/:id/promote",
  authMiddleware,
  roleMiddleware("admin"),
  promoteUser,
);

// Block a user
router.put("/:id/block", authMiddleware, roleMiddleware("admin"), blockUser);

module.exports = router;
