import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import INPUT from "@components/ui/Input";
import Select from "@components/ui/Select";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { setUser } from "store/slices/authSlice";
// import { useDispatch } from "react-redux";
import PATH from "@constants/path";
import Toast from "react-hot-toast";

import styles from "./NicknamePage.module.css";

export default function NicknamePage() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL;
  //   const accessToken = sessionStorage.getItem("accessToken");
  const accessToken: string | null = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  // const dispatch = useDispatch();

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log("닉네임 중복 확인 결과:", result);
        if (result) {
          // 중복일 경우 메시지 설정
          setDuplicateMessage("이미 사용중인 닉네임입니다.");
        } else {
          // 중복이 아닐 경우 메시지 초기화
          setDuplicateMessage("사용 가능한 닉네임입니다.");
        }
      })
      .catch(() => {
        // console.error("닉네임 중복 확인 실패:", error);
      });
  };

  // 사용할 닉네임 DB
  const saveNickname = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
          gender: gender,
        }),
      });

      if (response.ok) {
        response.json().then((result) => {
          // console.log("닉네임 저장 결과:", result);
          if (result) {
            // 닉네임 저장
            sessionStorage.removeItem("accessToken");
            sessionStorage.setItem("nickname", nickname);
            sessionStorage.setItem("accessToken", result.token);
            navigate(PATH.INTRODUCTION);
            Toast.success("리플레이스에 오신 것을 환영합니다.");

            // 기존 사용자 정보를 리덕스에 저장
            // dispatch(
            //   setUser({
            //     nickname,
            //     isAuthenticated: true,
            //     accessToken: accessToken || "",
            //   })
            // );
          } else {
            Toast.error("닉네임 저장에 실패했습니다.");
          }
        });
      } else {
        // ... (저장 실패 시의 코드)
        Toast.error("닉네임 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("닉네임 저장 실패:", error);
    }
  };

  const selectSort = [
    { value: "M", innertext: "남자" },
    { value: "F", innertext: "여자" },
  ];

  const selectSortoption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setGender(selectedValue);
  };

  return (
    <div className={styles.wrapper}>
      <Modal
        modalOpen={true}
        onClose={() => {}}
        title="첫 방문을 환영합니다."
        subtitle="사용할 닉네임을 입력해주세요."
        noButton={true}
      >
        <div>
          <div className={styles.duplicate}>
            <INPUT
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력해주세요."
              variant="short"
              value={nickname}
            />
            <Button variant="nickname" onClick={checkNickname}>
              중복 확인
            </Button>
          </div>
          <p className={styles.duplicateMent}>{duplicateMessage}</p>
          <div className={styles.genderCheck}>
            <p className={styles.optionMent}> 성별을 선택하세요.</p>
            <Select
              variant="short"
              name="selectSort"
              onChange={(_, value) =>
                selectSortoption({ target: { value } } as any)
              }
              children={selectSort.map((option) => ({
                value: option.value,
                innertext: option.innertext,
              }))}
            />
          </div>
        </div>
        <div>
          <Button onClick={saveNickname}>시작하기</Button>
        </div>
      </Modal>
    </div>
  );
}
