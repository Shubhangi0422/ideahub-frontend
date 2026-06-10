import api from "./api";

export const getComments = async (ideaId) => {
  const response = await api.get(`/comments/${ideaId}`);
  return response.data;
};

export const addComment = async (
  ideaId,
  content,
  token
) => {
  const response = await api.post(
    `/comments/${ideaId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};