import api from "./api";

export const likeIdea = async (ideaId, token) => {
  const response = await api.post(`/likes/${ideaId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const unlikeIdea = async (ideaId, token) => {
  const response = await api.delete(`/likes/${ideaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getLikesCount = async (ideaId) => {
  const response = await api.get(`/likes/${ideaId}`);
  return response.data;
};
