const ObjectID = require("mongoose").Types.ObjectId;

const User = require("../models/user.model");
const { Tenant } = require("../models/tenant.model");
const AppError = require("../utils/appError.util");
const catchAsyncError = require("../utils/catchAsync.util");

const objectID = (id, next) => {
  const message = `Invalid id provided`;
  if (!ObjectID.isValid(id)) return next(new AppError(message, 400));
};

const inputFile = (file, next) => {
  const message = `File not provided`;
  if (!file) return next(new AppError(message, 400));
};

const docType = (type, next) => {
  const message = `Document type is required`;
  if (!type) return next(new AppError(message, 400));
};

const fields = (ackNumber, udin, partyName, next) => {
  const message = `Fields are missing`;
  if (!ackNumber || !udin || !partyName)
    return next(new AppError(message, 400));
};

const payloadCreator = (req) => {
  return {
    userDetails: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      designation: req.body.designation,
    },
    companyDetails: {
      companyName: req.body.companyName,
      companyEmail: req.body.companyEmail,
    },
    userType: req.body.userType,
    userRole: req.body.userRole,
  };
};

exports.form15CB = (req, res, next) => {
  const { id } = req.params;
  const { file } = req;
  const { ackNumber, udin, partyName, documentType } = req.body;

  objectID(id, next);
  inputFile(file, next);
  docType(documentType, next);
  fields(ackNumber, udin, partyName, next);

  next();
};

exports.form15CAOrXml = (req, res, next) => {
  const { id } = req.params;
  const { file } = req;
  const { documentType } = req.body;

  objectID(id, next);
  inputFile(file, next);
  docType(documentType, next);

  next();
};

exports.tenantSignupFilter = catchAsyncError(async (req, res, next) => {
  const payload = payloadCreator(req);

  let user = await User.findOne({
    "userDetails.email": payload.userDetails.email,
  });

  if (user) return next(new AppError("Email-id already in use", 401));

  let isTenantRegistered = await Tenant.findOne({
    "userDetails.email": payload.userDetails.email,
  });

  if (isTenantRegistered)
    return next(new AppError("Email-id already in use", 401));

  req.body.payload = payload;

  next();
});

exports.clientSignupFilter = catchAsyncError(async (req, res, next) => {
  const payload = payloadCreator(req);

  let user = await User.findOne({
    "userDetails.email": payload.userDetails.email,
  });

  if (user) return next(new AppError("Email-id already in use", 401));

  req.body.payload = payload;

  next();
});

exports.loginFilter = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide valid email & password", 400));
  }

  next();
};

exports.workspaceFilter = (req, res, next) => {
  let { workspace } = req.body;

  if (!workspace) return next(new AppError("Provide a workspace-id", 401));

  req.body.workspace = workspace.toLowerCase();

  next();
};
