import config from "../config";
import http from "./httpServices";

const apiUrlToUpload15cb = config.apiUrl + "/v1/api/document/15cb";

export function upload15cb(id, data) {
  const result = http.post(apiUrlToUpload15cb + "/" + id, data);
  return result;
}

export default {
  upload15cb,
};
