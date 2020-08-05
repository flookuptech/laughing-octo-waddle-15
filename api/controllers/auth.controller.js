const User = require("../models/user.model");
const catchAsyncError = require("../utils/catchAsync.util");

exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create(req.body);

  // const token = newUser.generateAuthToken();

  res.status(201).json({
    status: "success",
    // token,
    data: {
      user: newUser,
    },
  });
});
