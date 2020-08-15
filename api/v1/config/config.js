const dev = {
  dbURL: process.env.MONGO_DB_LIST_DEV,
};

const prod = {
  dbURL: process.env.MONGO_DB_LIST_PROD,
};

const config = process.env.NODE_ENV === "prod" ? prod : dev;

module.exports = config;
