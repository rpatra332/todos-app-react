import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "http://localhost:5001",
  baseURL:
    "http://todos-rest-api-beanstalk-app-env.eba-m6h2rqn9.ap-south-1.elasticbeanstalk.com",
});
