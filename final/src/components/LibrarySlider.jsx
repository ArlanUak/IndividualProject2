import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import library1 from "../image/image 13.png";
import library2 from "../image/image 15.png";
import library3 from "../image/image 17.png";
import library4 from "../image/image 14.png";
import library5 from "../image/image 16.png";
import library6 from "../image/image 18.png";

const images = [library1, library2, library3, library4, library5, library6];

const LibrarySlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
  
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
  
    const getVisibleImages = () => {
      const visible = [];
      for (let i = -1; i <= 1; i++) {
        visible.push(images[(currentIndex + i + images.length) % images.length]);
      }
      return visible;
    };
  
    const visibleImages = getVisibleImages();
  
    return (
      <section className="library-slider">
        <h2>У нас есть собственная библиотека!</h2>
        <div className="slider-container">
          <button className="nav-btn" onClick={prevSlide}>←</button>
          <div className="slider-images">
            {visibleImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`library-${i}`}
                className={`slider-image ${i === 1 ? "active" : "faded"}`}
              />
            ))}
          </div>
          <button className="nav-btn" onClick={nextSlide}>→</button>
        </div>
      </section>
    );
  };
  
  export default LibrarySlider;