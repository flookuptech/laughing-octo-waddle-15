const mongoose = require("mongoose");
const Admin = mongoose.mongo.Admin;
const deasync = require("deasync");

const dbConfig = require("../config/config");

const dbListURI = dbConfig.dbURL;

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
              .then(() => console.log(`Connected to '${dbName}' database`));
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
