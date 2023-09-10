const { default: axios } = require("axios");

const api = axios.create({
  baseURL:
    "http://expensetrackernode-env-1.eba-uy4v23vp.ap-south-1.elasticbeanstalk.com",
  // baseURL: "http://localhost:8080",
});

export default api;
