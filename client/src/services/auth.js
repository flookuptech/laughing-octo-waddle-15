import http from "./httpServices";
import config from "../config";
import jwtDecode from "jwt-decode";
import { getToken } from "./getToken";

const workspaceApiEndpoint = config.apiUrl + "/v1/api/auth/workspace";
const loginApiEndpoint = config.apiUrl + "/v1/api/auth/login";

const token = "token";
const userDetails = "User";

export function workspaceAuthentication(workspace) {
  const result = http.post(workspaceApiEndpoint, workspace);
  return result;
}

export async function emailPassAuthentication(data) {
  try {
    const result = await http.post(loginApiEndpoint, data);
    const xAuthToken = result.headers["x-auth-token"];
    const bearerToken = "Bearer " + xAuthToken;
    localStorage.setItem(token, bearerToken);
    http.setToken(xAuthToken);
    const user = JSON.stringify(jwtDecode(xAuthToken));
    localStorage.setItem(userDetails, user);
    return result;
  } catch (error) {
    return error.response.data.message;
  }
}

export function logoutUser() {
  localStorage.removeItem(token);
  localStorage.removeItem(userDetails);
}

export function getCurrentUser() {
  try {
    const jwt = getToken();
    if (jwt) {
      return jwtDecode(jwt);
    } else {
      return null;
    }
  } catch (ex) {
    return null;
  }
}
