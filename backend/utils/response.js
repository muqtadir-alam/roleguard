// ===============================
// ✅ SUCCESS RESPONSE
// ===============================
export const sendSuccess = (
  res,
  data = {},
  message = "Success",
  meta = {},
  status = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    meta,
  });
};

// ===============================
// ❌ ERROR RESPONSE (SAFE)
// ===============================
export const sendError = (
  res,
  error = "Something went wrong",
  status = 500,
  errors = null
) => {
  let message = "Something went wrong. Please try again later.";

  // ✅ Handle string error
  if (typeof error === "string") {
    message = error;
  }

  // ✅ Handle object error (like mongoose, axios, etc.)
  else if (error?.message) {
    // 🔴 MongoDB timeout / connection issue
    if (error.message.includes("buffering timed out")) {
      message = "Server is busy. Please try again shortly.";
    }

    // 🔴 Duplicate key (MongoDB)
    else if (error.code === 11000) {
      message = "This record already exists.";
    }

    // 🔴 Mongoose validation error
    else if (error.name === "ValidationError") {
      message = "Invalid data provided.";
    }

    // 🔴 Invalid ObjectId
    else if (error.name === "CastError") {
      message = "Invalid request data.";
    }

    // 🔴 JWT errors (optional if using auth)
    else if (error.name === "JsonWebTokenError") {
      message = "Invalid token.";
    } else if (error.name === "TokenExpiredError") {
      message = "Session expired. Please login again.";
    }

    // 🔴 Default fallback
    else {
      message = "Something went wrong. Please try again later.";
    }
  }

  // ✅ Show real error in development only
  if (process.env.NODE_ENV === "development" && error?.message) {
    message = error.message;
  }

  // ✅ Log full error (VERY IMPORTANT)
  console.error("ERROR:", error);

  return res.status(status).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};

// ===============================
// ⚠️ VALIDATION ERROR
// ===============================
export const sendValidationError = (res, errors) => {
  return res.status(422).json({
    success: false,
    message: "Validation failed",
    errors,
  });
};

// ===============================
// 🔐 UNAUTHORIZED
// ===============================
export const sendUnauthorized = (
  res,
  message = "Unauthorized access"
) => {
  return res.status(401).json({
    success: false,
    message,
  });
};

// ===============================
// ⛔ FORBIDDEN
// ===============================
export const sendForbidden = (
  res,
  message = "Forbidden"
) => {
  return res.status(403).json({
    success: false,
    message,
  });
};

// ===============================
// 🔍 NOT FOUND
// ===============================
export const sendNotFound = (
  res,
  message = "Resource not found"
) => {
  return res.status(404).json({
    success: false,
    message,
  });
};