const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/User");

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || "house_rent_secret";
  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Please provide name, email, password and role.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // Only Rent and Owner can register
    const validRoles = ["rent", "owner"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: "Only Rent and Owner accounts can be registered.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error(error);

    if (error.code === 11000 && error.keyValue?.email) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    // ============================
    // Fixed Admin Login
    // ============================
    if (
      email === "admin@homehaven.com" &&
      password === "Admin@123"
    ) {
      const token = jwt.sign(
        {
          id: "admin",
          role: "admin",
        },
        process.env.JWT_SECRET || "house_rent_secret",
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        user: {
          id: "admin",
          name: "Administrator",
          email: "admin@homehaven.com",
          role: "admin",
        },
        token,
      });
    }

    // ============================
    // Normal User Login
    // ============================
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const token = generateToken(user._id);

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};