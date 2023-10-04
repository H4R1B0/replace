import { useState } from "react";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";

import { useNavigate } from "react-router-dom";

import styles from "./SearchResultPage.module.css";
import houseImg from "@assets/Image/house.png";
import { HiArrowRight } from "react-icons/hi2";

interface User {
  nickname: string;
  // 다른 사용자 정보 필드들도 여기에 추가
}

export default function SearchResultPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const accessToken: string | null = sessionStorage.getItem("accessToken");

  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  const handleSearch = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user?nickname=${searchTerm}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      } else {
        console.error("검색 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("오류가 발생했습니다.", error);
    }
  };

  // 해당 사용자 집으로 이동하기
  const handleMove = () => {
    if (searchResult === null) {
      console.error("검색 결과가 없습니다.");
      return;
    } else {
      navigate(`/house/${searchResult.nickname}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <h2 className={styles.searchTitle}>
          찾아가고 싶은 사용자의 이름을 입력해보세요.
        </h2>
        <div className={styles.searchInput}>
          <Input
            variant="userSearch"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="닉네임을 입력해주세요."
            value={searchTerm}
          />
          <Button variant="nickname" onClick={handleSearch}>
            검색
          </Button>
        </div>
        <div className={styles.searchResult}>
          {searchResult && searchResult.nickname ? (
            <div onClick={handleMove}>
              <img
                style={{ width: "200px", margin: "auto 1rem" }}
                // className={styles.houseImg}
                src={houseImg}
              />

              <p>{searchResult.nickname}님의</p>
              <p> 집으로 이동하시겠습니까?</p>

              {/* <p className={styles.searchMove}>이동하기</p> */}
              <div className={styles.searchMove}>
                <HiArrowRight />
              </div>
            </div>
          ) : searchResult ? (
            <p>검색 결과가 없습니다.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
