const express = require("express");
const router = express.Router();

const { Tenant } = require("../models/tenant");

router.post("/", async (req, res) => {
  const tenants = await Tenant.find({
    orgDatabase: req.body.db,
    role: "client"
  }).select("-__v -password -dateCreated -userType -orgEmail");
  res.send(tenants);
});

module.exports = router;
