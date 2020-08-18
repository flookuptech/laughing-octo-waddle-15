const ObjectID = require("mongoose").Types.ObjectId;

const User = require("../models/user.model");
const Invoice = require("../models/invoice.model");
const AppError = require("../utils/appError.util");
const { Tenant } = require("../models/tenant.model");
const catchAsyncError = require("../utils/catchAsync.util");

const objectID = (id, next) => {
  const message = `Invalid transcation id provided`;
  if (!ObjectID.isValid(id)) return next(new AppError(message, 400));
};

const inputFile = (file, next) => {
  const message = `File not provided`;
  if (!file) return next(new AppError(message, 400));
};

const docType = (type, next, docType) => {
  if (type !== docType)
    return next(new AppError("Invalid document type provided", 400));
  if (!type) return next(new AppError("Document type cannot to empty", 400));
};

const docType15CAXML = (type, next, file) => {
  if (type !== "15ca" && type !== "xml") {
    return next(new AppError("Invalid document type provided", 400));
  }

  if (!type) return next(new AppError("Document type cannot to empty", 400));

  const ext = file.mimetype.split("/")[1].toLowerCase();

  if (type === "xml" && ext !== "xml") {
    return next(new AppError("Upload valid xml file", 400));
  }
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

exports.invoiceFile = (req, res, next) => {
  if (!req.files.length)
    return next(new AppError("Invoice file not provided", 400));

  if (req.body.documentType !== "invoice")
    return next(new AppError("Invalid document type provided", 400));

  let invoiceData = {
    userRemarks: {
      tdsRate: req.body.tdsRate,
      remittanceCurrency: req.body.remittanceCurrency,
      remittanceNature: req.body.remittanceNature,
      purposeCode: req.body.purposeCode,
      taxPaid: req.body.taxPaid,
      trc: req.body.trc,
      clientRemarks: req.body.clientRemarks,
    },
    documentType: req.body.documentType,
    userId: req.user._id,
    user: req.user.workspace + "/" + req.user.companyNameSlug,
    invoiceCount: req.files.length,
  };

  req.body.payload = { ...invoiceData };

  next();
};

exports.form15CB = catchAsyncError(async (req, res, next) => {
  const { ackNumber, udin, partyName, documentType, adminRemarks } = req.body;

  objectID(req.params.id, next);
  inputFile(req.file, next);
  docType(documentType, next, "15cb");
  fields(ackNumber, udin, partyName, next);

  const id = await Invoice.findById(req.params.id);
  if (!id) return next(new AppError("Invalid id provided", 400));

  const obj = {
    ackNumber,
    udin,
    partyName,
    adminRemarks,
    documentType,
    admin: req.user.workspace + "/" + req.user.companyNameSlug,
    user: req.user.workspace + "/" + id.userId.companyDetails.companyNameSlug,
  };

  req.body.payload = { ...obj };

  next();
});

exports.form15CAOrXml = catchAsyncError(async (req, res, next) => {
  const documentType = req.body.documentType.toLowerCase();

  objectID(req.params.id, next);
  inputFile(req.file, next);
  docType15CAXML(documentType, next, req.file);

  const id = await Invoice.findById(req.params.id);
  if (!id) return next(new AppError("Invalid id provided", 400));

  const obj = {
    documentType,
    user: req.user.workspace + "/" + req.user.companyNameSlug,
  };

  req.body.payload = { ...obj };

  next();
});

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

exports.idChecker = catchAsyncError(async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return next(new AppError("Invalid user-id provided", 400));

  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("Invalid user-id provided", 400));

  next();
});
