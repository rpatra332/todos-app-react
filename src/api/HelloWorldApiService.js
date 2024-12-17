import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = (token) =>
  apiClient.get(`/hello-world-bean`, { headers: { Authorization: token } });

export const retrieveHelloWorldPathVariable = (username, token) =>
  apiClient.get(`/hello-world/path-variable/${username}`);
