import config from "../config";
import http from "./httpServices";

const apiUrlToUploadClientInvoice = config.apiUrl + "/v1/api/document/invoice";

export function uploadClientInvoice(data) {
  const result = http.post(apiUrlToUploadClientInvoice, data);
  return result;
}

export default {
  uploadClientInvoice,
};
