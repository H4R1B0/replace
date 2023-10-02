import { useState, useEffect } from "react";
import KakaoLoginButton from "@components/Auth/KakaoLoginButton";
import NaverLoginButton from "@components/Auth/NaverLoginButton";

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
    <div>
      메인입니다.
      <KakaoLoginButton />
      <NaverLoginButton />
    </div>
  );
}
