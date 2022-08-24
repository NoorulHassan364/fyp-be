const appError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  console.log(message);
  return new appError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

const handleInvalidToken = () => {
  return new appError("invalid token plz login again", 401);
};
const handleExpiredToken = () => {
  return new appError("your token is expired plz login again", 401);
};

module.exports = (err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    let error = err;
    if (err.name === "JsonWebTokenError") error = handleInvalidToken(error);
    if (err.name === "TokenExpiredError") error = handleExpiredToken(error);
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    sendErrorProd(error, res);
  }
};
