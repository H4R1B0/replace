import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import INPUT from "@components/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "@constants/path";

export default function NicknamePage() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL;
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  // 닉네임 중복 확인
  const checkNickname = () => {
    fetch(`${BASE_URL}/user/duplicate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("닉네임 중복 확인 결과:", result);
        if (result) {
          // 닉네임 중복

          alert("이미 사용중인 닉네임입니다.");
        } else {
          // 닉네임 중복 X
          alert("사용 가능한 닉네임입니다.");
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
          return response.json();
          navigate(PATH.HOUSE);
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
          />

          <Button onClick={checkNickname}>중복 확인</Button>
          <p> 성별을 선택하세요.</p>
          <select
            onChange={(e) => {
              setGender(e.target.value);
            }}
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
