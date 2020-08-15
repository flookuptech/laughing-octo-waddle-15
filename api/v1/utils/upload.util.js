const _ = require("lodash");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AppError = require("./appError.util");

const s3Config = new AWS.S3({
  accessKeyId: process.env.CACB_AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.CACB_AWS_SECRET_KEY,
  Bucket: process.env.CACB_AWS_BUCKET_NAME,
});

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.CACB_AWS_BUCKET_NAME,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const documentFolder = req.body.documentType;
    const user = req.body.user;
    const ext = file.mimetype.split("/")[1];

    cb(
      null,
      `${documentFolder}/${user}/${documentFolder}-${Date.now()}.${ext}`
    );
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
  storage: multerS3Config,
  fileFilter: multerFilter,
});

exports.uploadFile = upload.single("file");
