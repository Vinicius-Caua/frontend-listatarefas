import axios from "axios";

const apiUrl = "backend-listatarefas-production.up.railway.app";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
