/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const User = require('../models/user.model');
const AppError = require('../utils/appError.util');
const catchAsyncError = require('../utils/catchAsynError.util');

// exports.checkForId = (req, res, next, val) => {
//   console.log(val);
//   // return res.status(404).json({
//   //   status: 'fail',
//   //   message: 'Id not present',
//   // });
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  // throw new Error('Error created');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'User created!',
    data: { user: newUser },
  });
});

exports.getUserById = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('Invalid Id provided', 404));

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('Invalid Id provided', 404));

  res.status(201).json({
    status: 'success',
    message: 'User details updated!',
    data: { user },
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('Invalid Id provided', 404));

  res.status(204).json({
    status: 'success',
    message: 'User deleted',
    data: null,
  });
});
