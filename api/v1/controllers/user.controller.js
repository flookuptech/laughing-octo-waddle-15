/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const User = require("../models/user.model");
const AppError = require("../utils/appError.util");
const Invoice = require("../models/invoice.model");
const catchAsyncError = require("../utils/catchAsync.util");

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("Invalid Id provided", 404));

  res.status(201).json({
    status: "success",
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

  if (!user) return next(new AppError("Invalid Id provided", 404));

  res.status(201).json({
    status: "success",
    message: "User details updated!",
    data: { user },
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError("Invalid Id provided", 404));

  res.status(204).json({
    status: "success",
    message: "User deleted",
    data: null,
  });
});

exports.userTotalTranscations = catchAsyncError(async (req, res, next) => {
  const data = await Invoice.aggregate([
    { $group: { _id: "$userId", total: { $sum: 1 } } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "clientDetails",
      },
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        total: 1,
        clientDetails: {
          userDetails: { firstName: 1, lastName: 1, email: 1 },
          companyDetails: 1,
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.userTranscationSummary = catchAsyncError(async (req, res, next) => {
  const { status } = req.query;

  const data = await Invoice.aggregate([
    { $match: { status } },
    { $group: { _id: "$userId", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "clientDetails",
      },
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        count: 1,
        clientDetails: {
          totalTranscations: 1,
          userDetails: { firstName: 1, lastName: 1, email: 1 },
          companyDetails: 1,
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.userMonthSummary = catchAsyncError(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const data = await Invoice.aggregate([
    { $match: { $and: [{ userId: id }, { status: "complete" }] } },
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $project: { _id: 0, month: "$_id", count: 1 } },
  ]);

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});
