import axios from "axios";

// const apiUrl = "https://backend-listatarefas-production.up.railway.app/tarefas";
const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080" // URL para desenvolvimento
    : "https://backend-listatarefas-production.up.railway.app/tarefas"; // URL para produção

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
