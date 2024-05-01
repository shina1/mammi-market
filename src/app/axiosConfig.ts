import axios from "axios";
const axiosConfig = axios.create({
  baseURL: "https://fakestoreapi.com/",
  // baseURL: "http://simple-grocery-store-api.online/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export default axiosConfig;
