import api from "./api";

const getTasks = async (params = {}) => {
  const { data } = await api.get("/tasks", { params });
  return data.data;
};

const createTask = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data.data;
};

const updateTask = async (id, payload) => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data.data;
};

const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

export { getTasks, createTask, updateTask, deleteTask };
