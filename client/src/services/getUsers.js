import http from "./httpServices";
import config from "../config";

const urlToGetUsersAndTenants = config.apiUrl + "/v1/api/users";
// const urlToGetTenants = config.authApiUrl + "/getAllTenants";

export function getUsers() {
  const result = http.get(urlToGetUsersAndTenants);
  return result;
}

export function getAllTenants() {
  const result = http.get(urlToGetUsersAndTenants);
  return result;
}

export default {
  getUsers,
  getAllTenants,
};
