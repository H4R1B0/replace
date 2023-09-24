import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TributeListPage.module.css";
import TrributeEventCard from "@components/ui/TrributeEventCard";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

type Wreath = {
  wreathId: number;
  title: string;
  subTitle: string;
  startDate: string;
  endDate: string;
  flower: number;
  candle: number;
  ribbon: number;
  allCount: number;
};

type WreathData = {
  data: Wreath[];
};

export default function TributeListPage() {
  const navigate = useNavigate();
  //내가 한 헌화 or 모든 헌화 토글
  const [tributeListToggle, setTributeListToggle] = useState(true);

  const ToggleList = () => {
    setTributeListToggle(!tributeListToggle);
    if (tributeListToggle) {
      setWreathList(myWreathList);
    } else {
      setWreathList(allWreathList);
    }
  };

  // 헌화 리스트 저장
  // 초기에 값을 먼저 불러와 전체 헌화 리스트 or 내가 남긴 헌화 리스트로 저장함

  const [allWreathList, setAllWreathList] = useState<WreathData>({ data: [] });
  const [myWreathList, setMyWreathList] = useState<WreathData>({ data: [] });

  // 선택한 옵션에 따라 보여줄 헌화 리스트
  const [wreathList, setWreathList] = useState<WreathData>({ data: [] });
  console.log("gg", myWreathList);
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
        const sortedData = sortWreathList(data.response.data, sortOption);
        setAllWreathList({ data: sortedData });
        setWreathList({ data: sortedData });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/wreath/me`)
      .then((res) => {
        // 에러 코드에 따른 상태 관리를 위해 추가
        if (!res.ok) {
          throw new Error(`${res.status} 에러 발생`);
        }

        return res.json();
      })
      .then((data) => {
        const sortedData = sortWreathList(data.response.data, sortOption);
        setMyWreathList({ data: sortedData });
      })
      .catch((err) => console.log(err));
  }, []);

  // 정렬 옵션
  const [sortOption, setSortOption] = useState(1);
  console.log(sortOption);

  const selectSortoption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSortOption(selectedValue);
    console.log(selectedValue);
  };

  useEffect(() => {
    const sortedData = sortWreathList(wreathList.data, sortOption);
    setWreathList({ data: sortedData });
  }, [sortOption]);

  // 검색 옵션
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredWreathList = wreathList.data.filter((wreath) =>
    wreath.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // console.log(wreathList);
  // console.log(myWreathList);
  // console.log(tributeListToggle);

  const selectSort = [
    { value: "1", innertext: "최신 등록 순", id: 1 },
    { value: "2", innertext: "헌화 개수 순", id: 2 },
  ];

  return (
    <div className={styles.Wrapper}>
      <div className={styles.listWrapper}>
        <div className={styles.searchWraper}>
          <Input
            placeholder="헌화 제목 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="short"
          />
        </div>
        <div className={styles.btnWraper}>
          <Button onClick={ToggleList} variant="tributeList">
            {tributeListToggle ? "내 헌화 보기 " : "전체 헌화 보기"}
          </Button>
          <Select
            variant="short"
            name="selectSort"
            onChange={(_, value) =>
              selectSortoption({ target: { value } } as any)
            }
            children={selectSort.map((option) => ({
              value: option.value,
              innertext: option.innertext,
              id: option.id,
            }))}
          />
        </div>
        {wreathList.data.length == 0 ? (
          <div className={styles.empty}>
            <p> 아직 등록된 헌화 공간이 없어요. </p>
          </div>
        ) : filteredWreathList.length == 0 ? (
          <div className={styles.empty}>
            <p> 해당하는 헌화 공간이 없어요. </p>
          </div>
        ) : (
          <div>
            {filteredWreathList.map((wreath) => {
              if (!wreath) return null;

              return (
                <div
                  key={wreath.wreathId}
                  onClick={() => navigate(`/tribute/${wreath.wreathId}`)}
                >
                  <TrributeEventCard>
                    <p className={styles.Title}>{wreath.title}</p>
                    <div className={styles.date}>
                      {wreath.startDate} - {wreath.endDate}
                    </div>
                    <p>{wreath.subTitle}</p>
                    <div className={styles.trributeStatus}>
                      <img
                        className={styles.img}
                        src="https://i.imgur.com/Vq2GZni.png"
                        alt="flower"
                      />
                      <p>{wreath.flower}</p>
                      <img
                        className={styles.img}
                        src="https://i.imgur.com/8d34t5M.png"
                        alt="candle"
                      />
                      <p>{wreath.candle}</p>
                      <img
                        className={styles.img}
                        src="https://i.imgur.com/xFFXT3s.png"
                        alt="ribbon"
                      />
                      <p>{wreath.ribbon}</p>
                    </div>
                  </TrributeEventCard>
                </div>
              );
            })}
          </div>
        )}
      </div>
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
      sortedData.sort((a, b) => b.allCount - a.allCount);
      break;
    default:
      break;
  }

  return sortedData;
}
