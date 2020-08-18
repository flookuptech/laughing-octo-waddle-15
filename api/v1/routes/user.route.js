const express = require("express");
const router = express.Router();

const reqController = require("../controllers/req.controller");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const tenantController = require("../controllers/tenant.controller");

router.get("/", userController.getAllUsers);
router.get("/tenants", tenantController.getAllTenants);

router
  .route("/summary")
  .get(
    authController.protectRoute,
    authController.accessTo("admin"),
    userController.userTotalTranscations
  )
  .post(
    authController.protectRoute,
    authController.accessTo("admin"),
    userController.userTranscationSummary
  );

router
  .route("/summary/:id")
  .get(
    authController.protectRoute,
    reqController.idChecker,
    userController.userMonthSummary
  );

module.exports = router;
