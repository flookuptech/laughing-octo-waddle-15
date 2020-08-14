const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const contextService = require("request-context");

const email = require("../utils/email.util");
const User = require("../models/user.model");
const rand = require("../utils/randNumber.util");
const AppError = require("../utils/appError.util");
const catchAsyncError = require("../utils/catchAsync.util");
const { checkDbExists } = require("../utils/dbFinder.util");
const { tenantSchema, Tenant } = require("../models/tenant.model");

exports.connectToWorkspace = catchAsyncError(async (req, res, next) => {
  const workspaceExists = checkDbExists(req.body.workspace);

  res.status(201).json({
    status: "success",
    data: {
      workspaceExists,
    },
  });
});

exports.clientSignup = catchAsyncError(async (req, res, next) => {
  console.log(req.user);
  const { payload } = req.body;
  const { password, key } = await rand.generatePassword();

  let user = new User(payload);
  user.password = password;

  const userData = await user.save(); // Save user type:owner to `users` collection

  const message = `<h3>Welcome aboard!</h3><p>Below are your credentials to log in:</p><p>
    <b>Workspace:</b> ${userData.workspace}
    <b>Email:</b> ${userData.userDetails.email}
    </p><p><b>Password:</b> ${key}
    </p><p>Do not share this email with anyone.</p>`;

  await email({
    email: userData.userDetails.email,
    subject: `15CACB Utility - Your login credentials`,
    message,
  });

  return res.status(201).json({
    status: "success",
    data: { userData },
  });
});

exports.tenantSignup = catchAsyncError(async (req, res, next) => {
  const { payload } = req.body;

  if (payload.userType === "root") {
    const { password, key } = await rand.generatePassword();

    let user = new User(payload);
    user.password = password;

    const userData = await user.save(); // Save user type:owner to `users` collection

    const message = `<h3>Welcome aboard!</h3><p>Below are your credentials to log in:</p><p>
    <b>Workspace:</b> ${userData.workspace} 
    <b>Email:</b> ${userData.userDetails.email} 
    </p><p><b>Password:</b> ${key} 
    </p><p>Do not share this email with anyone.</p>`;

    await email({
      email: userData.userDetails.email,
      subject: `15CACB Utility - Your login credentials`,
      message,
    });

    return res.status(201).json({
      status: "success",
      data: { userData },
    });
  } else if (payload.userType === "client") {
    const { password, key } = await rand.generatePassword();

    let isTenantRegistered = new Tenant(payload); // Save user type:client to tenants collection
    isTenantRegistered.password = password;

    const registerTenant = await isTenantRegistered.save();

    // Save tenant details in tenant db
    const initiateTenantDbCon = await mongoose.createConnection(
      `mongodb://localhost:27017/${registerTenant.workspace}`
    );
    const tenantDb = initiateTenantDbCon.useDb(registerTenant.workspace, {});
    const TenantDbModel = tenantDb.model("Users", tenantSchema);

    let tenant = new TenantDbModel(payload);
    tenant.password = password;
    const tenantData = await tenant.save();

    const message = `<h3>Welcome aboard!</h3><p>Below are your credentials to log in:</p><p>
    <b>Workspace:</b> ${tenantData.workspace} 
    <b>Email:</b> ${tenantData.userDetails.email} 
    </p><p><b>Password:</b> ${key}
    </p><p>Do not share this email with anyone.</p>`;

    await email({
      email: tenantData.userDetails.email,
      subject: `15CACB Utility - Your login credentials`,
      message,
    });

    res.status(201).json({
      status: "success",
      data: {
        tenantData,
      },
    });

    await initiateTenantDbCon.close();
  }
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ "userDetails.email": email }).select(
    "+password"
  );

  if (!user) {
    return next(new AppError("Not a registered email-id", 401));
  }

  if (!user.isActive) {
    return next(new AppError("Your login access is disabled", 401));
  }

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).status(201).json({
    status: "success",
  });
});

exports.protectRoute = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.header("x-auth-token") &&
    req.header("x-auth-token").startsWith("Bearer")
  ) {
    token = req.header("x-auth-token").split(" ")[1];
  }

  if (!token) return next(new AppError("You are not logged in!", 401));

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.CACB_JWT_PRIVATEKEY
  );

  const currectUser = await User.exists({ _id: decoded._id });
  if (!currectUser) {
    return next(
      new AppError(
        "Invalid token! User belonging to this token no longer exists.",
        401
      )
    );
  }

  // if (currectUser.changedPassword(decoded.iat)) {
  //   return next(new AppError("Password changed! Login again..", 401));
  // }

  contextService.set("req:user", decoded);

  req.user = decoded;

  next();
});
