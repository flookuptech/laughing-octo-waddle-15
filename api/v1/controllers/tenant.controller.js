/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const { Tenant } = require("../models/tenant.model");
const AppError = require("../utils/appError.util");
const catchAsyncError = require("../utils/catchAsync.util");

exports.getAllTenants = catchAsyncError(async (req, res, next) => {
  const tenants = await Tenant.find();

  // throw new Error('Error created');

  res.status(200).json({
    status: "success",
    results: tenants.length,
    data: {
      tenants,
    },
  });
});
