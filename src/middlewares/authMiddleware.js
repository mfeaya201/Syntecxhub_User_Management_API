const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware function
const authMiddleware = async (req, res, next) => {
  try {
    // Read token from headers
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Authorization token missing or invalid");
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object
    const user = await User.findById(decoded.userId).select("-password");

    // Check if user exists and is not blocked
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    if (user.isBlocked) {
      res.status(403);
      throw new Error("User is blocked");
    }

    req.user = user;
    next();
  } catch (error) {
    // Pass error to global error handler
    next(error);
  }
};

module.exports = authMiddleware;
