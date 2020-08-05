/* eslint-disable prefer-destructuring */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const catchAsyncError = require('../utils/catchAsynError.util');
const AppError = require('../utils/appError.util');
const email = require('../utils/email');

exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = newUser.generateAuthToken();

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide valid email & password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = user.generateAuthToken();

  res.set('x-auth-token', token).status(201).json({
    status: 'success',
    token,
  });
});

exports.protectRoute = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.header('x-auth-token') &&
    req.header('x-auth-token').startsWith('Bearer')
  ) {
    token = req.header('x-auth-token').split(' ')[1];
  }

  if (!token) return next(new AppError('You are not logged in!', 401));

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.CACB_JWT_PRIVATEKEY
  );

  const currectUser = await User.findById(decoded._id);
  if (!currectUser) {
    return next(
      new AppError(
        'Invalid token! User belonging to this token no longer exists.',
        401
      )
    );
  }

  if (currectUser.changedPassword(decoded.iat)) {
    return next(new AppError('Password changed! Login again..', 401));
  }

  req.user = currectUser;

  next();
});

exports.accessTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have enough permissions to access this resource',
          403
        )
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('User with this email does not exist'));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Send a patch request ${resetUrl}`;

  try {
    await email({
      email: req.body.email,
      subject: 'Password reset token',
      message,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError('Error sending email', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email',
  });
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('Token is invalid or expired', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = user.generateAuthToken();
  res.status(200).json({
    status: 'success',
    token,
  });
});
