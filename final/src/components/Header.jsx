import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function Header({ onSearch, showSearch }) {
  const { user } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isBooksPage = location.pathname === "/books";

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header>
      <div className="header">
        <nav className="nav">
          <Link to="/" className="nav_link">Главная</Link>
          <Link to="/about" className="nav_link">О нас</Link>
          <Link to="/books" className="nav_link">Книги</Link>
        </nav>

        {/* Поиск только на /books */}
        <AnimatePresence>
          {isBooksPage && (
            <motion.div
              className="search-bar"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Поиск книг..."
              />
            </motion.div>
          )}
        </AnimatePresence>

        {user ? (
          <VscAccount
            className="account__logo"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer", color: "black" }}
          />
        ) : (
          <div className="auth-buttons">
            <button className="login-btn" onClick={() => setIsLoginOpen(true)}>Войти</button>
            <button  className="register-btn" onClick={() => setIsRegisterOpen(true)}>Зарегистрироваться</button>
          </div>
        )}

        {/* Модалки */}
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
        {isRegisterOpen && <RegistrationModal onClose={() => setIsRegisterOpen(false)} />}
      </div>
    </header>
  );
}
