const _ = require("lodash");

const z = require("../utils/zipper.util");
const { ocr } = require("../utils/ocr.util");
const Invoice = require("../models/invoice.model");
const AppError = require("../utils/appError.util");
const catchAsync = require("../utils/catchAsync.util");
const ApiFeatures = require("../utils/apiFeatures.util");

exports.userUploadsInvoice = catchAsync(async (req, res, next) => {
  if (!req.files.length)
    return next(new AppError("Invoice file not provided", 400));

  const docType = req.body.documentType;

  const objectS3 = await z.upload(req.body.user, docType);

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
    userId: req.body.user,
    invoiceCount: req.files.length,
    invoiceLink: objectS3.Location,
  };

  const doc = await Invoice.create(invoiceData);

  await z.emptyDir(req.body.user, docType);

  res.status(201).json({
    status: "success",
    data: {
      doc,
    },
  });
  await z.emptyDir(req.body.user, docType);
});

exports.adminUploads15CB = catchAsync(async (req, res, next) => {
  const docType = req.body.documentType;

  const data = await ocr(req.file);

  const objectS3 = await z.upload(req.body.user, docType);

  const fifteenCbObj = {
    ackNumber: req.body.ackNumber,
    udin: req.body.udin,
    partyName: req.body.partyName,
    status: "complete",
    cbLink: objectS3.Location,
    textFrom15CB: data[0],
  };

  const doc = await Invoice.findByIdAndUpdate(
    { _id: req.params.id },
    fifteenCbObj,
    { new: true, runValidators: true }
  );

  await z.emptyDir(req.body.user, docType);

  res.status(201).json({
    status: "success",
    results: doc.length,
    data: {
      doc,
    },
  });
  await z.emptyDir(req.body.user, docType);
});

exports.upload15CaOrXml = catchAsync(async (req, res, next) => {
  const docType = req.body.documentType;
  const buffer = Buffer.from(req.file.path);

  const ext = req.file.mimetype.split("/")[1];

  const objectS3 = await z.upload(req.body.user, docType);
  let fileLink = {};

  if (ext === "xml") {
    fileLink["xmlLink"] = objectS3.Location;
  } else {
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
  await z.emptyDir(req.body.user, docType);
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

exports.getAllTranscations = catchAsync(async (req, res, next) => {
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
