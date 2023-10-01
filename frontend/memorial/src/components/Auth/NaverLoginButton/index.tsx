export default function NaverLoginButton() {
  const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;

  const NAVER_URL = `https://j9b307.p.ssafy.io/api/oauth2/authorization/naver?redirect_uri=${REDIRECT_URI}/oauth/redirect`;

  const handleNaverLogin = () => {
    window.location.href = NAVER_URL;
  };

  return (
    <div>
      <button onClick={handleNaverLogin}>네이버 로그인</button>
    </div>
  );
}
