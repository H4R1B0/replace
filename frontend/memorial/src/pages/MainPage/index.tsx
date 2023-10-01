import KakaoLoginButton from "@components/Auth/KakaoLoginButton";
import NaverLoginButton from "@components/Auth/NaverLoginButton";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={styles.wrapper}>
      메인입니다.
      <KakaoLoginButton />
      <NaverLoginButton />
    </div>
  );
}
