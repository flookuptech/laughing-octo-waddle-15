import config from "../config";
import http from "./httpServices";

const apiUrlToUpload15ca = config.apiUrl + "/v1/api/document/15ca";

export function upload15ca(id, data) {
  const result = http.post(apiUrlToUpload15ca + "/" + id, data);
  return result;
}

export default {
  upload15ca,
};
