import jwt from "jsonwebtoken";
import { sendError } from "../utils/response.js";

// 🔐 PROTECT ROUTES
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(res, "No token, authorization denied", 401);
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return sendError(res, "Invalid or expired token", 401);
  }
};

// 🛡️ ROLE-BASED ACCESS
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, "Unauthorized", 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, "Forbidden: Access denied", 403);
    }

    next();
  };
};