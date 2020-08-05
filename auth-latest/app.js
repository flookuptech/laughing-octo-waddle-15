// eslint-disable-next-line import/newline-after-import
const express = require('express');
const app = express();
const morgan = require('morgan');

const userRouter = require('./routes/user.routes');
const globalErrorController = require('./controllers/error.controller');

const AppError = require('./utils/appError.util');

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());

app.use('/v1/auth/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Not found! Route: ${req.originalUrl}`, 404));
});

app.use(globalErrorController);

module.exports = app;
