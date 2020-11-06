const GlobalError = require("./../utils/globalError");

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
    name: err.name,
  });
};

const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went wrong.",
    });
  }
};

const castError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new GlobalError(message, 400);
};

const duplicatteFieldsError = (err) => {
  const message = `Duplicate field value: (${err.keyValue.name}). please use another value`;
  return new GlobalError(message, 400);
};

const validationError = (err) => {
  return new GlobalError(err.message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") {
      err = castError(err);
    } else if (err.code === 11000) {
      err = duplicatteFieldsError(err);
    } else if (err.name === "ValidationError") {
      err = validationError(err);
    }

    productionError(err, res);
  }
};
