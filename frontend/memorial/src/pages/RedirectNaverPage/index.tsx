import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PATH from "@constants/path";
import Spinner from "@components/ui/Spinner";

export default function RedirectNaverPage() {
  const navigate = useNavigate();
  const accessToken = new URL(window.location.href).searchParams.get("token");

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);

      fetch("https://j9b307.p.ssafy.io/api/user/isChange", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          const isFirstLogin = !userData.isChange;

          if (isFirstLogin) {
            navigate(PATH.NICKNAME);
          } else {
            const { nickname } = userData;
            sessionStorage.setItem("nickname", nickname);
            navigate(`/house/${nickname}`);
          }
        })
        .catch((error) => {
          console.error("사용자 정보 요청 실패:", error);
          navigate(PATH.ERROR_PAGE);
        });
    } else {
      navigate(PATH.MAIN);
    }
  }, [navigate]);

  return (
    <div>
      <Spinner />
    </div>
  );
}
