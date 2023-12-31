import KakaoBtn from "@assets/btn/KaKaoLoginBtn.png";

export default function KakaoLoginButton() {
  // const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;

  // const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const KAKAO_URL = `https://j9b307.p.ssafy.io/api/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}/oauth/redirect`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <div>
      <img src={KakaoBtn} alt="카카오 로그인" onClick={handleKakaoLogin} />
      {/* <button onClick={handleKakaoLogin}>카카오 로그인</button> */}
    </div>
  );
}
