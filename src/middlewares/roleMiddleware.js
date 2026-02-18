const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Ensure user exists on request (set by authMiddleware)
      if (!req.user) {
        res.status(401);
        throw new Error("Unauthorized: No user information found");
      }

      // Check if user's role matches required role
      if (req.user.role !== requiredRole) {
        res.status(403);
        throw new Error("Access denied: Insufficient permissions");
      }

      // If role matches, allow access
      next();
    } catch (error) {
      // Pass error to global error handler
      next(error);
    }
  };
};

module.exports = roleMiddleware;
