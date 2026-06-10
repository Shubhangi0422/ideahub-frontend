import api from "./api";

export const getMyIdeas = async (token) => {
  const response = await api.get("/users/my-ideas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMyComments = async (token) => {
  const response = await api.get("/users/my-comments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMyLikes = async (token) => {
  const response = await api.get("/users/my-likes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMySavedIdeas = async (token) => {
  const response = await api.get("/users/my-saved-ideas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUserProfile = async (userData, token) => {
  const response = await api.put("/users/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changeUserPassword = async (passwordData, token) => {
  const response = await api.put("/users/change-password", passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};