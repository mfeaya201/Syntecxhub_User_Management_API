const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getAuditLogs } = require("../controllers/auditController");

const router = express.Router();

// Admin-only route to fetch audit logs
router.get("/", authMiddleware, roleMiddleware("admin"), getAuditLogs);

module.exports = router;
