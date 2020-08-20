import config from "../config";
import http from "./httpServices";

const apiUrlToUploadXml = config.apiUrl + "/v1/api/document/xml";

export function uploadXml(id, data) {
  const result = http.post(apiUrlToUploadXml + "/" + id, data);
  return result;
}

export default {
  uploadXml,
};
