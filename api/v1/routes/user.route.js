const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const tenantController = require("../controllers/tenant.controller");

router.get("/", userController.getAllUsers);
router.get("/tenants", tenantController.getAllTenants);

module.exports = router;
