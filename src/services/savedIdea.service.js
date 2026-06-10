import api from "./api";

export const saveIdea = async (ideaId, token) => {
  const response = await api.post(
    `/saved/${ideaId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const unsaveIdea = async (ideaId, token) => {
  const response = await api.delete(`/saved/${ideaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};