import config from "../config";
import http from "./httpServices";

const apiUrlToGetAllTransactions =
  config.apiUrl + "/v1/api/document/transcations";

export function getAllTransactions(status) {
  const result = http.get(apiUrlToGetAllTransactions + "?status=" + status);
  return result;
}

export function getAllTransactionsForClient(status, user) {
  const result = http.get(
    apiUrlToGetAllTransactions + "?status=" + status + "&userId=" + user
  );
  return result;
}

export default {
  getAllTransactions,
  getAllTransactionsForClient,
};
