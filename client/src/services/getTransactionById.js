import config from "../config";
import http from "./httpServices";

const apiUrlToGetTransactionById =
  config.apiUrl + "/v1/api/document/transcations";

export function getTransactionById(id) {
  const result = http.get(apiUrlToGetTransactionById + "/" + id);
  return result;
}

export default {
  getTransactionById,
};
