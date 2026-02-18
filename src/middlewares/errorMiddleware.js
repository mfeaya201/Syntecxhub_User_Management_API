// Middleware to handle errors globally
const errorHandler = (err, req, res, next) => {
  // Log full error in terminal for debugging
  console.error(err.stack);

  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    // Send only message to client, not stack trace
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
