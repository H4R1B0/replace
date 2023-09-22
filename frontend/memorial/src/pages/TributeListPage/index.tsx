import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Wreath = {
  wreathId: number;
  title: string;
  subTitle: string;
  startDate: string;
  endDate: string;
  flower: number;
  candle: number;
  ribbon: number;
};

type WreathData = {
  data: Wreath[];
};

export default function TributeListPage() {
  const navigate = useNavigate();

  // 헌화 리스트 저장
  const [wreathList, setWreathList] = useState<WreathData>({ data: [] });

  // fetch 관련, 추후 옮길 것.
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/wreath`)
      .then((res) => {
        // 에러 코드에 따른 상태 관리를 위해 추가
        if (!res.ok) {
          throw new Error(`${res.status} 에러 발생`);
        }

        return res.json();
      })
      .then((data) => {
        console.log("데이터 확인", data);
        const sortedData = sortWreathList(data.response.data, sortOption);
        setWreathList({ data: sortedData });
      })
      .catch((err) => console.log(err));
  }, []);

  const [sortOption, setSortOption] = useState(1);

  const selectSortoption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSortOption(selectedValue);
    console.log(selectedValue);
  };

  useEffect(() => {
    const sortedData = sortWreathList(wreathList.data, sortOption);
    setWreathList({ data: sortedData });
  }, [sortOption]);

  return (
    <div>
      <select name="selectSort" id="selectSort" onChange={selectSortoption}>
        <option value="1">최신 등록 순</option>
        <option value="2">초 개수 순</option>
        <option value="3">꽃 개수 순</option>
        <option value="4">리본 개수 순</option>
      </select>
      {wreathList.data.length == 0 ? (
        <p> 아직 등록된 헌화 공간이 없어요. </p>
      ) : (
        <ul>
          {wreathList.data.map((wreath) => {
            if (!wreath) return null;

            return (
              <li
                key={wreath.wreathId}
                onClick={() => navigate(`/tribute/${wreath.wreathId}`)}
              >
                <h3>{wreath.title}</h3>
                <p>{wreath.subTitle}</p>
                <p>
                  {wreath.startDate} ~ {wreath.endDate}
                </p>
                <p>꽃 {wreath.flower}</p>
                <p>초 {wreath.candle}</p>
                <p>리본 {wreath.ribbon}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function sortWreathList(data: Wreath[], option: number): Wreath[] {
  let sortedData = [...data]; // 데이터 복사

  switch (option) {
    case 1: // 최신 등록 순
      sortedData.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
      break;
    case 2: // 초 개수 순
      sortedData.sort((a, b) => b.candle - a.candle);
      break;
    case 3: // 꽃 개수 순
      sortedData.sort((a, b) => b.flower - a.flower);
      break;
    case 4: // 리본 개수 순
      sortedData.sort((a, b) => b.ribbon - a.ribbon);
      break;
    default:
      break;
  }

  return sortedData;
}
