const express = require("express");
const router = express.Router();

const uploadMulti = require("../utils/uploadMulti.util");
const authController = require("../controllers/auth.controller");
const requestValidator = require("../controllers/req.controller");
const documentController = require("../controllers/document.controller");

router
  .route("/invoice")
  .post(
    authController.protectRoute,
    uploadMulti.uploadMultiFiles,
    documentController.userUploadsInvoice
  );

router
  .route("/15cb/:id")
  .post(
    uploadMulti.uploadFile,
    requestValidator.form15CB,
    documentController.adminUploads15CB
  );

router
  .route("/15caOrXml/:id")
  .post(
    uploadMulti.uploadFile,
    requestValidator.form15CAOrXml,
    documentController.upload15CaOrXml
  );

router
  .route("/transcations")
  .get(authController.protectRoute, documentController.getTranscations);

router
  .route("/transcations/:id")
  .get(documentController.getTranscationByID)
  .patch(documentController.updateTranscationByID);

module.exports = router;
