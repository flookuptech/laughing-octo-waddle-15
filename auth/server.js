// Packages
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

//Local imports
const auth = require("./routes/auth");
const getUsers = require("./routes/getUsers");
const getAllTenants = require("./routes/getTenants");
const registerTenant = require("./routes/registerTenants");
const regsiterClient = require("./routes/registerClientUser");
const { dbUriFuncAuth } = require("./services/dbConnectionAuth/dbUri");

console.log("AUTH CACB App...");

// Check if the jwt private key is set or not
if (!process.env.CACB_JWT_PRIVATEKEY) {
  console.log("FATAL ERROR: Set CACB_JWT_PRIVATEKEY.");
  process.exit(1);
}
if (!process.env.CACB_MAIL_PASSWORD) {
  console.log("FATAL ERROR: Set CACB_MAIL_PASSWORD.");
  process.exit(1);
}
if (!process.env.CACB_DB_PASSWORD) {
  console.log("FATAL ERROR: Set CACB_DB_PASSWORD.");
  process.exit(1);
}

// DB connection to authentication database
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

const dbName = config.get("dbName");
const uri = dbUriFuncAuth(dbName);

mongoose
  .connect(uri)
  .then(() => console.log(`Connected to auth database..`))
  .catch((err) => console.log("Could not connect to auth database: ", err));

// Routes
app.use("/login", auth);
app.use("/getUsers", getUsers);
app.use("/register", registerTenant);
app.use("/getAllTenants", getAllTenants);
app.use("/regsiterClient", regsiterClient);

// Port
const PORT = 5001;
app.listen(PORT, () => console.log(`Auth app listening on port ${PORT}...`));

module.exports = app;
