const { promisify } = require("util");
const mongoose = require("mongoose");
const Admin = mongoose.mongo.Admin;
const deasync = require("deasync");
const AppError = require("./appError.util");

const dbListURI = process.env.MONGO_DB_LIST_DEV;

exports.checkDbExists = (dbName) => {
  let check;
  mongoose
    .connect(dbListURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      new Admin(mongoose.connection.db)
        .listDatabases()
        .then(({ databases }) => {
          check = databases.some((db) => db.name === dbName);
          if (check) {
            const uri = dbListURI + dbName;
            mongoose
              .connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
              })
              .then(() => console.log(`Connected to ${uri} database`));
          }
        })
        .catch(() => console.log("Failed to search for workspaces"));
    })
    .catch(() => console.log("Failed to connect to workspace"));

  while (check == null) {
    deasync.runLoopOnce();
  }
  return check;
};
