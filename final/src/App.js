import "./style/styles.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AboutUs from "./pages/AboutUs";
import BooksPage from "./pages/BooksPage";
import NotFound from "./pages/NotFound";
import BookItemPage from "./pages/BookItemPage";
import { AuthProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import { useState } from "react";
import Layout from "./components/Layout";

function App() {
  const [query, setQuery] = useState("");

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout onSearch={setQuery} />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="books" element={<BooksPage query={query} />} />
          <Route path="books/:isbn13" element={<BookItemPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
