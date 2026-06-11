import { createContext, useContext, useState, useEffect } from "react";
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "../services/notification.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  const fetchNotifications = async () => {
    const tokenVal = localStorage.getItem("token") || token;
    if (!tokenVal) return;
    try {
      const data = await getNotifications(tokenVal);
      if (data.success) {
        setNotifications(data.notifications || []);
        setUnreadCount((data.notifications || []).filter((n) => !n.isRead).length);
      }
    } catch (error) {
      console.error("Error fetching notifications in context:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [token]);

  const handleMarkAllAsRead = async () => {
    const tokenVal = localStorage.getItem("token") || token;
    if (!tokenVal) return;
    try {
      await markAllNotificationsAsRead(tokenVal);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all read:", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    const tokenVal = localStorage.getItem("token") || token;
    if (!tokenVal) return;
    try {
      await markNotificationAsRead(id, tokenVal);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking read:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
        theme,
        toggleTheme,
        notifications,
        unreadCount,
        fetchNotifications,
        markAllAsRead: handleMarkAllAsRead,
        markAsRead: handleMarkAsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);