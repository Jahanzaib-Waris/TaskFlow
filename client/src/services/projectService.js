import api from "./api";

const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data.data;
};

const createProject = async (payload) => {
  const { data } = await api.post("/projects", payload);
  return data.data;
};

const updateProject = async (id, payload) => {
  const { data } = await api.put(`/projects/${id}`, payload);
  return data.data;
};

const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};

export { getProjects, createProject, updateProject, deleteProject };
