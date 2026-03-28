import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendSuccess, sendError } from "../utils/response.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔍 Validation
    if (!name || !email || !password) {
      return sendError(res, "All fields are required", 400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return sendSuccess(
      res,
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      "User registered successfully"
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Validation
    if (!email || !password) {
      return sendError(res, "Email and password are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, "User not found", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, "Invalid credentials", 401);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return sendSuccess(
      res,
      {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      "Login successful"
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};