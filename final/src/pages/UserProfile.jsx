import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import RegistrationModal from "../components/RegistrationModal";

const UserProfile = () => {
  const { user, favorites, logout, removeFromFavorites, loadingProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return isModalOpen ? (
      <RegistrationModal onClose={() => setIsModalOpen(false)} />
    ) : null;
  }

  return (
    <div className="user-profile">
      {loadingProfile ? (
        <p>Загрузка профиля...</p>
      ) : (
        <>
          <div className="profile__top">
            <img
              src={user.avatar || "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png"}
              alt="avatar"
              className="avatar"
              style={{ width: "80px", borderRadius: "50%" }}
            />
            <div>
              <h2>Привет, {user.name}!</h2>
              <p>{user.bio}</p>
            </div>
            <button onClick={handleLogout} className="logout__btn">
              Выйти
            </button>
          </div>

          <div className="books">
            <h3>Ваши избранные книги:</h3>
            {favorites.length > 0 ? (
              <div className="books__spisok" style={{ gap: "30px" }}>
                {favorites.map((book) => (
                  <div key={book._id} className="spisok__item">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        gap: "10px",
                      }}
                    >
                      <Link to={`/books/${book.isbn13}`} style={{ flexGrow: 1 }}>
                        <img src={book.image} alt={book.title} />
                        <h4 className="item__title">{book.title}</h4>
                        <p className="item__subtitle">
                          {book.desc || "Нет темы"}
                        </p>
                      </Link>
                      <button
                        onClick={() => removeFromFavorites(book._id)}
                        style={{
                          backgroundColor: "#e74c3c",
                          color: "white",
                          padding: "6px",
                          borderRadius: "6px",
                          border: "none",
                        }}
                      >
                        Удалить из избранного
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Вы пока не добавили книги в избранное</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
