const fs = require("fs");
const path = require("path");

const s3 = require("./s3.util");
const zipper = require("zip-local");
const AppError = require("./appError.util");

exports.upload = async (user, docType) => {
  const buff = await zip(user, docType);
  const data = await s3.s3Upload(user, docType, buff);
  return data;
};

const zip = (user, docType) => {
  return new Promise((resolve, reject) => {
    zipper.zip(`tmp/${user}/${docType}`, function (err, zipped) {
      if (err) {
        reject(new AppError("Error zipping files", 500));
      }
      zipped.compress();
      const buff = zipped.memory();

      resolve(buff);
    });
  });
};

exports.emptyDir = (user, docType) => {
  return new Promise((resolve, reject) => {
    fs.readdir(`tmp/${user}/${docType}`, (err, files) => {
      if (err)
        return reject(
          new AppError(`Failed to empty 'tmp/${user}/${docType}' dir`, 500)
        );

      for (const file of files) {
        fs.unlink(path.join(`tmp/${user}/${docType}`, file), (err) => {
          if (err)
            return reject(
              new AppError(
                `Failed to delete 'tmp/${user}/${docType}/${file}'`,
                500
              )
            );
          resolve("deleted");
        });
      }
    });
  });
};
