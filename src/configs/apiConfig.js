const { default: axios } = require("axios");

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;
