const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup function
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide name, email and password");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User with this email already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await user.save();

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Pass error to global error handler
    next(error);
  }
};

// Login function
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // Check if user is blocked
    if (user.isBlocked) {
      res.status(403);
      throw new Error("User is blocked");
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    // Pass error to global error handler
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
