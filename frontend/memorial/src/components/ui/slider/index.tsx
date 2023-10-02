// Slider.tsx
import { useState } from "react";
import styles from "./Slider.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";

interface Slide {
  image: string;
  title: string;
  description: string;
}

interface SliderProps {
  slides: Slide[];
}

export default function Slider({ slides }: SliderProps) {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    if (currentIndex === slides.length - 1) {
      navigate(`/house/${nickname}`);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goPrev = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );

  const offset = -currentIndex * 100;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderWrapper}
          style={{
            transform: `translateX(${offset}%)`,
            transition: "transform 0.5s",
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={slide.image}
                alt={slide.title}
                className={styles.sliderImage}
              />
            </div>
          ))}
        </div>
        <div className={styles.btnwrapper}>
          <div className={`${styles.sliderButton} ${styles.slidertext}`}>
            <h2 className={styles.slideTitle}>{slides[currentIndex].title}</h2>
            <p className={styles.slideDescription}>
              {slides[currentIndex].description}
            </p>
          </div>
          <div className={styles.buttons}>
            <Button
              onClick={goPrev}
              variant="tutotial"
              className={`${styles.sliderButton} ${styles.sliderButtonPrev}`}
            >
              Prev
            </Button>
            <Button
              onClick={goNext}
              variant="tutotial"
              className={`${styles.sliderButton} ${styles.sliderButtonNext}`}
            >
              {currentIndex === slides.length - 1 ? "시작하기" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
