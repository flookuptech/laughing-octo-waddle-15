const config = require("config");

const dbUsername = config.get("dbUsername");
const dbPassword = process.env.CACB_DB_PASSWORD;
function dbUriFunc(dbName) {
  const uri = `mongodb+srv://${dbUsername}:${dbPassword}@15cacb-5x6wh.mongodb.net/test?retryWrites=true&w=majority`;
  return uri;
}

exports.dbUriFunc = dbUriFunc;
