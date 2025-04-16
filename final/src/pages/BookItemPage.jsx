import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

export default function BookItemPage() {
  const { isbn13 } = useParams();
  const [book, setBook] = useState();
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const { user, favorites, addToFavorites, removeFromFavorites } = useAuth();

  const API_URL = "https://backendbookproject.onrender.com/api/reviews";

  // Загрузка информации о книге
  useEffect(() => {
    fetch(`https://backendbookproject.onrender.com/api/books/${isbn13}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Ошибка:", error))
      .finally(() => setLoading(false));
  }, [isbn13]);

  // Загрузка отзывов с бэкенда
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const headers = {};
  
        const token = localStorage.getItem("token");
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
  
        const res = await fetch(`${API_URL}/${isbn13}`, {
          headers,
        });
  
        if (!res.ok) throw new Error("Ошибка загрузки отзывов");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Ошибка при получении отзывов:", error);
      }
    };
  
    fetchReviews();
  }, [isbn13]);

  // Отправка нового отзыва
  const handleReviewSubmit = async () => {
    if (!user) {
      alert("Только авторизованные пользователи могут оставлять отзывы!");
      return;
    }

    if (!newReview.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://backendbookproject.onrender.com/api/reviews/${book._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            book: book._id,
            user: user._id,
            comment: newReview,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        console.error("Ошибка от сервера:", errData);
        throw new Error("Ошибка при добавлении отзыва");
      }

      const data = await response.json();
      const updatedReviews = [...reviews, data];
      setReviews(updatedReviews);
      setNewReview("");
      setRating(5);
    } catch (error) {
      console.error("Ошибка при отправке отзыва:", error);
    }
  };


  const isFavorite = book && favorites.some((fav) => fav._id === book._id);
  // Проверяем, есть ли книга в избранном

  const toggleFavorite = () => {
    if (!user) {
      alert("Только авторизованные пользователи могут добавлять книги в избранное!");
      return;
    }
  
    if (!book || !book._id) return;
  
    if (isFavorite) {
      removeFromFavorites(book._id);
    } else {
      addToFavorites(book);
    }
  };
  

  if (isLoading) return <Loader />;
  if (!book) return <p>Книга не найдена</p>;

  return (
    <div className="book__details">
      <div className="book_main">
        <div className="book__main-info">
          <h2>{book.title}</h2>
          <img src={book.image} alt={book.title} />
          <p><strong>Цена:</strong> {book.price}</p>
          <Link to={book.url} target="_blank" rel="noopener noreferrer" className="buy-button">
            Купить
          </Link>
          <button onClick={toggleFavorite} className="favorite-button">
            {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          </button>
        </div>

        <div className="book__info">
          <p><strong>Автор:</strong> {book.authors}</p>
          <p><strong>Издатель:</strong> {book.publisher}</p>
          <p><strong>Страниц:</strong> {book.pages}</p>
          <p><strong>Год:</strong> {book.year}</p>
          <p><strong>Рейтинг:</strong> {book.rating}/5</p>
          <p><strong>Описание:</strong> {book.desc}</p>
        </div>
      </div>

      {/* Отзывы */}
      <div className="reviews-section">
        <h3>Отзывы</h3>
        <div className="reviews-container">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p><strong>
                  {/* Проверяем, что review.user существует, и выводим его имя */}
                  {review.user?.username || review.user?.name || "Пользователь"}
                </strong></p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>Отзывов пока нет</p>
          )}
        </div>

        {user ? (
          <div className="review-form">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Оставьте отзыв..."
            />
           
            <button onClick={handleReviewSubmit}>Отправить</button>
          </div>
        ) : (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Войдите в аккаунт, чтобы оставить отзыв!
          </p>
        )}
      </div>
    </div>
  );
}
