import { useState, useEffect } from "react";
import KakaoLoginButton from "@components/Auth/KakaoLoginButton";
import NaverLoginButton from "@components/Auth/NaverLoginButton";
import styles from "./MainPage.module.css";
import { playLightBGM } from "@utils/effectSound";

export default function MainPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNewBackground, setIsNewBackground] = useState(false);
  const usePlayLightBGM = playLightBGM();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    setIsNewBackground(true);
    usePlayLightBGM;
    setIsVisible(true);
  };

  return (
    <div
      className={`${styles.wrapper} ${isVisible ? styles.visible : ""}`}
      onClick={handleClick}
    >
      <div
        className={`${styles.backgroundImg} ${
          isNewBackground ? styles.newBackground : ""
        }`}
      >
        {isNewBackground ? (
          " "
        ) : (
          <div className={styles.titlewrapper}>
            <img src="https://i.imgur.com/OkG9hB2.png" alt="switch" />
            "화면을 클릭해보세요"
          </div>
        )}
        <img
          src="https://i.imgur.com/3AZe7Rj.png"
          alt="logo"
          className={styles.logo}
        />
        <div className={styles.btnwrapper}>
          <KakaoLoginButton />
          <NaverLoginButton />
        </div>
      </div>
    </div>
  );
}
