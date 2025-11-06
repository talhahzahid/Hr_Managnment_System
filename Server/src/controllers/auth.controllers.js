import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESSTOKEN, {
    expiresIn: "15m",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, department, role } = req.body;

    if (!name || !email || !password || !department || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: false });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Email already in use", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      department,
      role,
    });

    return res.status(201).json({
      message: "User created successfully",
      status: true,
      user: [
        {
          id: user._id,
          name: user.name,
          email: user.email,
          department: user.department,
          role: user.role,
        },
      ],
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(404)
        .json({ message: "Email is required", status: false });
    }
    if (!password) {
      return res
        .status(404)
        .json({ message: "Password is required", status: false });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      res.status(400).json({ messge: "Incorrect password" });
    }

    // generate token from user
    const token = generateAccessToken(user);
    res.status(200).json({
      messge: "Login Successfully",
      status: true,
      data: [
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            department: user.department,
            role: user.role,
          },
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
      status: true,
      data: [
        {
          token: null,
          user: null,
        },
      ],
    });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: err.message,
    });
  }
};
