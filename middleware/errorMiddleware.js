const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //Mongoose cast Error
  if (err.name === "castError") {
    const message = "Resource not found";
    error = new errorResponse(message, 404);
  }
  //Duplicate key Error
  if (err.code === 11000) {
    const message = "Duplicate field value enterd";
    error = new errorResponse(message, 404);
  }

  //Mongoose validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  }
};

module.exports = errorHandler;
