import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const API_BASE = "https://backendbookproject.onrender.com/api";

  const login = async (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    await fetchProfile();
    await fetchFavorites();
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("favorites");
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingProfile(true);
    try {
      const res = await fetch(`${API_BASE}/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка получения профиля");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Ошибка загрузки профиля:", err);
      logout(); // если токен невалиден — выходим
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/profile/me/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка получения избранного");

      const data = await res.json();
      const favoriteBooks = Array.isArray(data.favoriteBooks) ? data.favoriteBooks : [];
      setFavorites(favoriteBooks);
      localStorage.setItem("favorites", JSON.stringify(favoriteBooks));
    } catch (error) {
      console.error("Ошибка загрузки избранных книг:", error);
      setFavorites([]);
      localStorage.removeItem("favorites");
    }
  };

  const addToFavorites = async (book) => {
    try {
      const res = await fetch(`${API_BASE}/profile/me/favorites/${book._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка добавления в избранное");

      const updatedFavorites = [...favorites, book];
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Ошибка при добавлении книги в избранное:", error);
    }
  };

  const removeFromFavorites = async (bookId) => {
    try {
      const res = await fetch(`${API_BASE}/profile/me/favorites/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка удаления");

      const data = await res.json();
      setFavorites(data.favoriteBooks);
    } catch (err) {
      console.error("Ошибка при удалении из избранного:", err);
    }
  };

  // Загрузка пользователя и избранного при запуске
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log("Загрузка из localStorage:", savedUser, token);
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      fetchProfile();
      fetchFavorites();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        setUser,
        login,
        logout,
        addToFavorites,
        removeFromFavorites,
        isAuthenticated: !!user,
        loadingProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
