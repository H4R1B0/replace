import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { setUser } from "store/slices/authSlice";
// import { useDispatch } from "react-redux";

import PATH from "@constants/path";

export default function RedirectKakaoPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // URL에서 토큰 추출
  const accessToken = new URL(window.location.href).searchParams.get("token");

  useEffect(() => {
    // 토큰이 있는지 확인
    if (accessToken) {
      // 토큰을 세션 스토리지에 저장
      sessionStorage.setItem("accessToken", accessToken);
      // console.log("토큰 저장 완료", accessToken);

      // 최초 로그인 여부 확인
      fetch("https://j9b307.p.ssafy.io/api/user/isChange", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          // console.log("사용자 정보 요청 성공:", userData);
          const isFirstLogin = !userData.isChange;

          if (isFirstLogin) {
            navigate(PATH.NICKNAME); // 최초 로그인 사용자
            // console.log("첫 로그인");
          } else {
            navigate(PATH.HOUSE); // 기존 로그인 사용자
            // console.log("기존 로그인");
            // 기존 사용자 정보를 세션 스토리지에 저장
            const { nickname } = userData;
            sessionStorage.setItem("nickname", nickname);

            // 기존 사용자 정보를 리덕스에 저장
            //     dispatch(
            //       setUser({
            //         nickname,
            //         isAuthenticated: true,
            //         accessToken,
            //       })
            //     );
          }
        })
        .catch((error) => {
          console.error("사용자 정보 요청 실패:", error);
          navigate(PATH.ERROR_PAGE);
        });
    } else {
      // 토큰이 없으면 메인 페이지로 이동
      navigate(PATH.MAIN);
    }
  }, [navigate]);

  return (
    <div>
      <h1>Redirect 페이지</h1>
      <p>카카오 로그인 중.../ 차후 로딩 페이지와 연결하기</p>
    </div>
  );
}
