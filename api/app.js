// eslint-disable-next-line import/newline-after-import
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const contextService = require("request-context");

const AppError = require("./v1/utils/appError.util");
const { globalErrorController } = require("./v1/controllers/error.controller");
const authRoute = require("./v1/routes/auth.route");
const userRoute = require("./v1/routes/user.route");
const documentRoute = require("./v1/routes/document.route");

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ exposedHeaders: "x-auth-token" }));
app.use(contextService.middleware("request"));

app.use("/v1/api/auth", authRoute);
app.use("/v1/api/users", userRoute);
app.use("/v1/api/document", documentRoute);

app.get("/test", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "XML Converter",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
