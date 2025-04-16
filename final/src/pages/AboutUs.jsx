import React from "react";
import LibrarySlider from "../components/LibrarySlider";

export default function AboutUs() {
  return (
    <>
      <section className="second" id="library">
        <div className="container">
          <div className="second__container">
            <p className="second__header">
              IT Library –{" "}
              <span>
                онлайн-платформа для поиска и изучения лучших книг по
                программированию и технологиям
              </span>
            </p>
            <div className="second__grid">
              <div className="second__item">
                <h2>500+</h2>
                <p>Книг по программированию, кибербезопасности и IT</p>
              </div>
              <div className="second__item">
                <h2>300+</h2>
                <p>Рекомендаций от ведущих специалистов IT-индустрии</p>
              </div>
              <div className="second__item">
                <h2>1000+</h2>
                <p>Читателей, изучивших наш каталог</p>
              </div>
              <div className="second__item">
                <h2>50+</h2>
                <p>Новых книг добавляется каждый месяц</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="third" id="benefits">
        <div className="container">
          <div className="third__container">
            <h1 className="third__header">
              Что вы получите от нашей библиотеки
            </h1>
            <div className="third__grid">
              <div className="third__item">
                <h3>Доступ к знаниям</h3>
                <p>Широкий выбор книг по всем направлениям IT</p>
              </div>
              <div className="third__item">
                <h3>Экспертные материалы</h3>
                <p>Рекомендации от ведущих программистов и аналитиков</p>
              </div>
              <div className="third__item">
                <h3>Обновляемый каталог</h3>
                <p>Регулярное пополнение новыми изданиями и рецензиями</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LibrarySlider/>
    </>
  );
}
