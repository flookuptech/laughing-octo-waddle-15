import config from "../config";
import http from "./httpServices";

const apiUrlToUpload15caOrXml = config.apiUrl + "/v1/api/document/15caOrXml";

export function upload15caOrXml(id, data) {
  console.log("serviceData", ...data);
  const result = http.post(apiUrlToUpload15caOrXml + "/" + id, data);
  return result;
}

export default {
  upload15caOrXml,
};
