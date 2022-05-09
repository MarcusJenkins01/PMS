import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
  }
});

// Add the token to all request headers
http.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('token');
  config.headers.Authorisation = token;
  return config;
});

export default http;
