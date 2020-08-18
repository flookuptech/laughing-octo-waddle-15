import config from "../config";
import http from "./httpServices";

const apiUrlToCreateUsers = config.apiUrl;

export function createTenantOrRoot(data) {
  const result = http.post(
    apiUrlToCreateUsers + "/v1/api/auth/tenantsignup",
    data
  );
  return result;
}

export function createClient(data) {
  const result = http.post(
    apiUrlToCreateUsers + "/v1/api/auth/clientsignup",
    data
  );
  return result;
}

export default {
  createTenantOrRoot,
  createClient,
};
