const AppError = require('../utils/appError.util');

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: 'fail',
    message: error.message,
    error,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  } else {
    res.status(error.statusCode).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value found: ${value}. Please change!`;
  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid data provided! ${errors.join(' ')}`;
  return new AppError(message, 400);
};

const handleJwtError = () => new AppError('Invalid token provided', 401);

const handleJwtExpiredTokenError = () =>
  new AppError('Token expired! Invalid token', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleJwtError();
    if (error.name === 'TokenExpiredError')
      error = handleJwtExpiredTokenError();
    sendErrorProd(error, res);
  }
};
