import { useState, useEffect } from "react";
import KakaoLoginButton from "@components/Auth/KakaoLoginButton";
import NaverLoginButton from "@components/Auth/NaverLoginButton";
import styles from "./MainPage.module.css";
import { playLightBGM } from "@utils/useSound"; // 경로는 해당 프로젝트에 맞게 수정하세요

export default function MainPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNewBackground, setIsNewBackground] = useState(false);
  const usePlayLightBGM = playLightBGM(); // usePlayLightBGM 커스텀 훅을 호출

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
      onClick={handleClick} // 사용자가 div를 클릭하면 handleClick 함수를 호출
    >
      <div
        className={`${styles.backgroundImg} ${
          isNewBackground ? styles.newBackground : ""
        }`}
      >
        {isNewBackground ? (
          " "
        ) : (
          <div className={styles.titlewrapper}>"화면을 클릭해보세요"</div>
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
