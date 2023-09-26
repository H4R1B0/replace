export default function KakaoLoginButton() {
  // const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  // const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  // const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const KAKAO_URL = `https://j9b307.p.ssafy.io/api/oauth2/authorization/kakao?redirect_uri=https://j9b307.p.ssafy.io/oauth/redirect`;
  const KAKAO_URL = `https://j9b307.p.ssafy.io/api/oauth2/authorization/kakao?redirect_uri=https://j9b307.p.ssafy.io/oauth/redirect`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <div>
      <button onClick={handleKakaoLogin}>카카오 로그인</button>
    </div>
  );
}
