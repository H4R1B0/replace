import { useState, useEffect } from "react";
import KakaoLoginButton from "@components/Auth/KakaoLoginButton";
import NaverLoginButton from "@components/Auth/NaverLoginButton";
import styles from "./MainPage.module.css";
import { playLightBGM } from "@utils/effectSound";

export default function MainPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNewBackground, setIsNewBackground] = useState(false);
  const usePlayLightBGM = playLightBGM();
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    setIsNewBackground(true);
    usePlayLightBGM;
    setIsVisible(true);
  };
  useEffect(() => {
    if (loadedImages === 2) {
      setIsVisible(true);
    }
  }, [loadedImages]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
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
            <img
              src="https://i.imgur.com/OkG9hB2.png"
              alt="switch"
              onLoad={handleImageLoad} // 이미지 로드 완료시 호출될 핸들러
            />
            "화면을 클릭해보세요"
          </div>
        )}
        <img
          src="https://i.imgur.com/3AZe7Rj.png"
          alt="logo"
          className={styles.logo}
          onLoad={handleImageLoad} // 이미지 로드 완료시 호출될 핸들러
        />
        <div className={styles.btnwrapper}>
          <KakaoLoginButton />
          <NaverLoginButton />
        </div>
      </div>
    </div>
  );
}
