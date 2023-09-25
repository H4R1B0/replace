import { useEffect } from "react";

export default function RedirectKakaoPage() {
  useEffect(() => {
    // URL에서 쿼리 파라미터에서 인증 코드 가져오기
    // const code = new URL(window.location.href).searchParams.get("code");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    // 카카오 로그인 성공 후에 인증 코드가 URL에 포함
    if (code) {
      // 액세스 토큰 요청을 위한 데이터 준비
      const data = {
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY, // 카카오 앱의 REST API KEY
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        code: code,
      };

      // 액세스 토큰 요청 보내기
      fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams(data).toString(),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("액세스 토큰 요청 실패");
          }
          return response.json();
        })
        .then((tokenData) => {
          // 액세스 토큰 받아오기 성공
          const accessToken = tokenData.access_token;

          // 엑세스 토큰을 세션스토리지에 저장
          sessionStorage.Storage.clear();
          sessionStorage.setItem("accessToken", accessToken);

          // 최초 로그인 여부 추가
          fetch("https://kapi.kakao.com/v2/user/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((response) => response.json())
            .then((userData) => {
              // 사용자 정보를 기반으로 최초 로그인 여부 확인
              const isFirstLogin = !userData.id; // 사용자 정보에서 ID가 없으면 최초 로그인으로 간주

              if (isFirstLogin) {
                // 최초 로그인인 경우 -> 튜토리얼과 연결하기
                window.location.href = "/tutorial";
              } else {
                // 기존 로그인인 경우
                window.location.href = "/house";
              }
            })
            .catch((error) => {
              console.error("사용자 정보 요청 실패:", error);
              window.location.href = "/error-page";
            });
        })
        .catch((error) => {
          console.error("액세스 토큰 요청 실패:", error);
          // 오류 처리 로직?
          window.location.href = "/error-page";
        });
    }
  }, []);

  return (
    <div>
      <h1>Redirect 페이지</h1>
      <p>카카오 로그인 중.../ 차후 로딩 페이지와 연결하기</p>
    </div>
  );
}
