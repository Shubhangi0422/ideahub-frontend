import api from "./api";

export const getNotifications = async (token) => {
  const response = await api.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const markAllNotificationsAsRead = async (token) => {
  const response = await api.put("/notifications/read", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const markNotificationAsRead = async (id, token) => {
  const response = await api.put(`/notifications/${id}/read`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
