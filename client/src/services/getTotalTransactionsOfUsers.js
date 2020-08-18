import config from "../config";
import http from "./httpServices";

const apiUrlToGetTotalTransactions = config.apiUrl + "/v1/api/users/summary";

export function getTotalTransactionsOfUsers() {
  const result = http.get(apiUrlToGetTotalTransactions);
  return result;
}

export default {
  getTotalTransactionsOfUsers,
};
