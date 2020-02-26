const express = require("express");
const router = express.Router();

const { Tenant } = require("../models/tenant");

router.get("/", async (req, res) => {
  const tenants = await Tenant.find({ role: "admin" }).select(
    "-__v -password -userType"
  );
  res.send(tenants);
});

module.exports = router;
