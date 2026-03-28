// ✅ SUCCESS RESPONSE
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

// ❌ ERROR RESPONSE
export const sendError = (
  res,
  message = "Something went wrong",
  status = 500,
  errors = null
) => {
  return res.status(status).json({
    success: false,
    message,
    ...(errors && { errors }), // optional field
  });
};

// ⚠️ VALIDATION ERROR (OPTIONAL HELPER)
export const sendValidationError = (res, errors) => {
  return res.status(422).json({
    success: false,
    message: "Validation failed",
    errors,
  });
};

// 🔐 UNAUTHORIZED (OPTIONAL HELPER)
export const sendUnauthorized = (res, message = "Unauthorized") => {
  return res.status(401).json({
    success: false,
    message,
  });
};

// ⛔ FORBIDDEN (OPTIONAL HELPER)
export const sendForbidden = (res, message = "Forbidden") => {
  return res.status(403).json({
    success: false,
    message,
  });
};

// 🔍 NOT FOUND (OPTIONAL HELPER)
export const sendNotFound = (res, message = "Resource not found") => {
  return res.status(404).json({
    success: false,
    message,
  });
};