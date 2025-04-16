import ItBooks from "../image/image 20.png";
import Loader from "../components/Loader";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function MainPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.itbook.store/1.0/search/react"
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.books.slice(0, 3));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    }
    getBooks();
  }, []);


  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/books");
  } 


  return (
    <div className="container">
      <main>
        <section className="hero">
          <div className="main_container">
            <h1 className="main_title">
            Книжная вселенная
                        </h1>
            <p className="main_subtitle">
              Здесь вы найдете лучшие книги по программированию, разработке и
              технологиям
            </p>
            <button onClick={handleClick} className="main_btn">Посмотреть библиотеку книг</button>
          </div>
          <img src={ItBooks} alt="Book" className="main_book" />
        </section>
      </main>
      
      </div>
  );
}
