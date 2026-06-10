import api from "./api";

export const getAllIdeas = async () => {
  const response = await api.get("/ideas");
  return response.data;
};

export const getIdeaById = async (id) => {
  const response = await api.get(`/ideas/${id}`);
  return response.data;
};

export const createIdea = async (ideaData, token) => {
  const response = await api.post("/ideas", ideaData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateIdea = async (id, ideaData, token) => {
  const response = await api.put(`/ideas/${id}`, ideaData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};