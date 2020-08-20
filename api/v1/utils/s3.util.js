const AWS = require("aws-sdk");
const AppError = require("./appError.util");

const awsS3 = new AWS.S3({
  accessKeyId: process.env.CACB_AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.CACB_AWS_SECRET_KEY,
});

const uploadParams = {
  Bucket: process.env.CACB_AWS_BUCKET_NAME,
  Key: null,
  Body: null,
  ACL: "public-read",
};

const s3FileExtension = "zip";

exports.s3Upload = (user, docType, buffer, filename) => {
  return new Promise((resolve, reject) => {
    uploadParams.Key = `${user}/${docType}/${docType}-${filename}.${s3FileExtension}`;
    uploadParams.Body = buffer;
    const params = uploadParams;

    awsS3.upload(params, function (err, data) {
      if (err) {
        reject(new AppError("Failed to upload zip file", 500));
      }
      resolve(data);
    });
  });
};
