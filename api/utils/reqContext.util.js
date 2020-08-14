const contextService = require("request-context");

exports.getContext = () => {
  return () => contextService.get("request:user.db");
};
