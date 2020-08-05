// eslint-disable-next-line import/newline-after-import
const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./utils/appError.util");
const { globalErrorController } = require("./controllers/error.controller");
const authRoute = require("./routes/auth.route");
const documentRoute = require("./routes/document.route");

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());

app.use("/v1/api/auth", authRoute);
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
