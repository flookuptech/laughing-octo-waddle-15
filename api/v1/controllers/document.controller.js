const _ = require("lodash");

const z = require("../utils/zipper.util");
const { ocr } = require("../utils/ocr.util");
const Invoice = require("../models/invoice.model");
const AppError = require("../utils/appError.util");
const catchAsync = require("../utils/catchAsync.util");
const ApiFeatures = require("../utils/apiFeatures.util");

exports.userUploadsInvoice = catchAsync(async (req, res, next) => {
  let { payload } = req.body;

  const objectS3 = await z.upload(payload.user, payload.documentType);

  payload.invoiceLink = objectS3.Location;

  const doc = await Invoice.create(payload);

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

  const objectS3 = await z.upload15CB(
    payload.admin,
    payload.documentType,
    payload.user
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

exports.upload15CaOrXml = catchAsync(async (req, res, next) => {
  const { payload } = req.body;

  const ext = req.file.mimetype.split("/")[1].toLowerCase();
  const objectS3 = await z.upload(payload.user, payload.documentType);

  let fileLink = {};
  if (ext === "xml" && payload.documentType === "xml") {
    fileLink["xmlLink"] = objectS3.Location;
  } else if (ext === "pdf" && payload.documentType === "15ca") {
    fileLink["caLink"] = objectS3.Location;
  }

  const doc = await Invoice.findByIdAndUpdate(
    { _id: req.params.id },
    fileLink,
    { new: true, runValidators: true }
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
