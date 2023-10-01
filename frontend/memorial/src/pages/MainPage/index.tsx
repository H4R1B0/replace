import KakaoLoginButton from "@components/Auth/KakaoLoginButton";
import NaverLoginButton from "@components/Auth/NaverLoginButton";

export default function MainPage() {
  return (
    <div>
      메인입니다.
      <KakaoLoginButton />
      <NaverLoginButton />
    </div>
  );
}
