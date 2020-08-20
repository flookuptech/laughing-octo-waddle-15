const _ = require("lodash");

const z = require("../utils/zipper.util");
const { ocr } = require("../utils/ocr.util");
const User = require("../models/user.model");
const rand = require("../utils/randNumber.util");
const Invoice = require("../models/invoice.model");
const catchAsync = require("../utils/catchAsync.util");
const ApiFeatures = require("../utils/apiFeatures.util");

exports.userUploadsInvoice = catchAsync(async (req, res, next) => {
  let { payload } = req.body;

  const objectS3 = await z.upload(
    payload.user,
    payload.documentType,
    payload.fileIdentifier
  );

  payload.invoiceLink = objectS3.Location;
  payload.trackingNumber = payload.fileIdentifier;

  const doc = await Invoice.create(payload);

  const update = await User.findByIdAndUpdate(
    req.user._id,
    {
      $inc: { totalTranscations: 1 },
    },
    {
      runValidators: false,
    }
  );

  res.status(201).json({
    status: "success",
    data: {
      doc,
    },
  });

  await z.emptyDir(payload.user, payload.documentType);
});

exports.adminUploads15CB = catchAsync(async (req, res, next) => {
  let { payload } = req.body;

  const data = await ocr(req.file);

  const objectS3 = await z.uploadAdmin(
    payload.admin,
    payload.documentType,
    payload.user,
    payload.fileIdentifier
  );

  payload.status = "complete";
  payload.isTranscationComplete = true;
  payload.cbLink = objectS3.Location;
  payload.textFrom15CB = data[0];

  const doc = await Invoice.findByIdAndUpdate({ _id: req.params.id }, payload, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    results: doc.length,
    data: {
      doc,
    },
  });

  await z.emptyDir(payload.admin, payload.documentType);
});

exports.upload15Ca = catchAsync(async (req, res, next) => {
  const { payload } = req.body;

  const objectS3 = await z.upload(
    payload.user,
    payload.documentType,
    payload.fileIdentifier
  );

  const doc = await Invoice.findByIdAndUpdate(
    { _id: req.params.id },
    { caLink: objectS3.Location },
    { new: true, runValidators: false }
  );

  res.status(201).json({
    status: "success",
    results: doc.length,
    data: {
      doc,
    },
  });

  await z.emptyDir(payload.user, payload.documentType);
});

exports.uploadXML = catchAsync(async (req, res, next) => {
  const { payload } = req.body;

  const objectS3 = await z.uploadAdmin(
    payload.admin,
    payload.documentType,
    payload.user,
    payload.fileIdentifier
  );

  const doc = await Invoice.findByIdAndUpdate(
    { _id: req.params.id },
    { xmlLink: objectS3.Location },
    { new: true, runValidators: false }
  );

  res.status(201).json({
    status: "success",
    results: doc.length,
    data: {
      doc,
    },
  });

  await z.emptyDir(payload.admin, payload.documentType);
});

exports.getTranscationByID = catchAsync(async (req, res, next) => {
  const transcation = await Invoice.findById({ _id: req.params.id });

  res.status(201).json({
    status: "success",
    results: transcation.length,
    data: {
      transcation,
    },
  });
});

exports.updateTranscationByID = catchAsync(async (req, res, next) => {
  const updatedTranscation = await Invoice.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "success",
    results: updatedTranscation.length,
    data: {
      updatedTranscation,
    },
  });
});

exports.getTranscations = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Invoice.find(), req)
    .filter()
    .sort("-updatedAt")
    .paginate();
  const transcations = await features.query;

  res.status(201).json({
    status: "success",
    results: transcations.length,
    data: {
      transcations,
    },
  });
});

exports.deleteTranscation = catchAsync(async (req, res, next) => {});
