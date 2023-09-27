import { useState } from "react";
import Input from "@components/ui/Input";

import { useNavigate } from "react-router-dom";

interface User {
  nickname: string;
  // 다른 사용자 정보 필드들도 여기에 추가
}

export default function SearchResultPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const accessToken = sessionStorage.getItem("accessToken");

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
        // 오류 처리
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
    <div>
      <h1>사용자 검색 페이지</h1>
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="닉네임을 입력해주세요."
        variant="regular"
        value={searchTerm}
      />
      <button onClick={handleSearch}>검색</button>
      {searchResult && searchResult.nickname ? (
        <p onClick={handleMove}>
          {searchResult.nickname}님의 집으로 이동하시겠습니까?
        </p>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
