require("dotenv").config();
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  // console.log("UNHANDLED EXCEPTION! SHUTTING DOWN...");
  console.log(err, err.message);
  // process.exit(1);
});

const app = require("./app");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const PORT = 5000;
// eslint-disable-next-line no-console
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log(err);

  // console.log("UNHANDLED REJECTION! SHUTTING DOWN...");
  // server.close(() => {
  //   process.exit(1);
  // });
});
