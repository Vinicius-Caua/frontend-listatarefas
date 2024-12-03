import axios from "axios";

// const apiUrl = "https://backend-listatarefas-production.up.railway.app";
const apiUrl = "http://localhost:8080";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
