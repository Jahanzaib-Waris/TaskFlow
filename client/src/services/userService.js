import api from "./api";

const updateProfile = async (payload) => {
  const { data } = await api.put("/users/profile", payload);
  return data.data;
};

const updatePassword = async (payload) => {
  const { data } = await api.put("/users/password", payload);
  return data.data;
};

export { updateProfile, updatePassword };
