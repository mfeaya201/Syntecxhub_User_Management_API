require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const auditRoutes = require("./src/routes/auditRoutes");

// Import error handler
const errorHandler = require("./src/middlewares/errorMiddleware");

const app = express();

// Middleware to read JSON
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/audit", auditRoutes);

// Health route (simple)
app.get("/", (req, res) => res.send("OK"));

// Global error handler
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Server PID:", process.pid);
});

// Error handlers for visibility
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
