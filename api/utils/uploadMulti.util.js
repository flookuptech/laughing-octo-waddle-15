const fs = require("fs");

const r = require("./randNumber.util");
const multer = require("multer");
const AppError = require("./appError.util");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = req.body.user;
    const docType = req.body.documentType;
    fs.mkdir(`tmp/${folder}/${docType}`, { recursive: true }, (err) => {
      if (err) {
        cb(new AppError("Failed to create directory", 400), false);
      }
      cb(null, `tmp/${folder}/${docType}`);
    });
  },
  filename: function (req, file, cb) {
    const rand = r.generateRandNumber(10, "alphanumeric");
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${rand}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  const value = [
    "image/jpeg",
    "image/png",
    "image.jpg",
    "application/pdf",
    "application/xml",
  ].includes(file.mimetype);

  if (value) cb(null, true);
  else cb(new AppError("Invalid file format", 400), false);
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});

exports.uploadFile = upload.single("file");
exports.uploadMultiFiles = upload.array("invoices", 5);
