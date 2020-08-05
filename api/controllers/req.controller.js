const ObjectID = require("mongoose").Types.ObjectId;

const AppError = require("../utils/appError.util");

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
