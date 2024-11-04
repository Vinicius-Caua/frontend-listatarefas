import axios from "axios";

const apiUrl = "https://backend-listatarefas-production.up.railway.app/tarefas";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
