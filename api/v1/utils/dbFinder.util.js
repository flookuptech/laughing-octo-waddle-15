const mongoose = require("mongoose");
const Admin = mongoose.mongo.Admin;
const deasync = require("deasync");

const AppError = require("./appError.util");
const dbConfig = require("../config/config");

const dbListURI = dbConfig.dbURL;

let con = {};

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 10,
};

exports.checkDbExists = (dbName, next) => {
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
            mongoose.connect(uri, mongoOptions).then((db) => {
              con.isConnected = db.connections[0].readyState;

              console.log(`Connected to '${dbName}' database`);
            });
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
