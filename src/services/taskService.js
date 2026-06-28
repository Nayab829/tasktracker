import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getTasks = () => API.get("/");
export const getTaskById = (id) => API.get(`/${id}`);
export const createTask = (data) => API.post("/", data);
export const updateTask = (id, data) => API.put(`/${id}`, data);
export const deleteTask = (id) => API.delete(`/${id}`);
