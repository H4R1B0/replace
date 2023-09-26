import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import INPUT from "@components/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "store/slices/authSlice";
import { useDispatch } from "react-redux";
import PATH from "@constants/path";

export default function NicknamePage() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL;
  //   const accessToken = sessionStorage.getItem("accessToken");
  const accessToken: string | null = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [duplicateMessage, setDuplicateMessage] = useState<string>("");

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    setDuplicateMessage("");
  };

  // 닉네임 중복 확인
  const checkNickname = () => {
    fetch(`${BASE_URL}/user/duplicate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("닉네임 중복 확인 결과:", result);
        if (result) {
          // 중복일 경우 메시지 설정
          setDuplicateMessage("이미 사용중인 닉네임입니다.");
        } else {
          // 중복이 아닐 경우 메시지 초기화
          setDuplicateMessage("사용 가능한 닉네임입니다.");
        }
      })
      .catch((error) => {
        console.error("닉네임 중복 확인 실패:", error);
      });
  };

  // 사용할 닉네임 DB
  const saveNickname = () => {
    fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nickname: nickname,
        gender: gender,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate(PATH.HOUSE);
          // 닉네임 저장
          sessionStorage.setItem("nickname", nickname);

          // 기존 사용자 정보를 리덕스에 저장
          dispatch(
            setUser({
              nickname,
              isAuthenticated: true,
              accessToken: accessToken || "",
            })
          );
        } else {
          alert("닉네임 저장 실패");
        }
      })
      .catch((error) => {
        console.error("닉네임 저장 실패:", error);
      });
  };

  return (
    <div>
      <Modal
        modalOpen={true}
        onClose={() => {}}
        title="첫 방문을 환영합니다."
        subtitle="사용할 닉네임을 입력해주세요."
        noButton={true}
      >
        <div>
          <INPUT
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력해주세요."
            variant="regular"
            value={nickname}
          />

          <Button onClick={checkNickname}>중복 확인</Button>
          <p>{duplicateMessage}</p>
          <p> 성별을 선택하세요.</p>
          <select
            onChange={(e) => {
              setGender(e.target.value);
            }}
            value={gender}
          >
            <option value="M">남자</option>
            <option value="F">여자</option>
          </select>
        </div>
        <Button onClick={saveNickname}>시작하기</Button>
      </Modal>
    </div>
  );
}
