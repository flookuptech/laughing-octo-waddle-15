import config from "../config";
import http from "./httpServices";

const apiUrlToGet15cbSummary = config.apiUrl + "/v1/api/users/summary";

export function get15cbSummaryOfClients(status) {
  const result = http.post(apiUrlToGet15cbSummary + "?status=" + status);
  return result;
}

export function get15cbSummaryForClient(id) {
  const result = http.get(
    apiUrlToGet15cbSummary + "/" + id + "?status=complete"
  );
  return result;
}

export default {
  get15cbSummaryOfClients,
  get15cbSummaryForClient,
};
