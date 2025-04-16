import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout({ onSearch }) {
  const location = useLocation();

  const isBooksPage = location.pathname.startsWith("/books");
  const isHomePage = location.pathname === "/";

  const layoutClassName = isHomePage
    ? "layout main-layout"
    : "layout default-layout";

  return (
    <div className={layoutClassName}>
      <Header onSearch={onSearch} showSearch={isBooksPage} />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
