import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TributeListPage.module.css";
import TrributeEventCard from "@components/ui/TrributeEventCard";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import { useQuery } from "@tanstack/react-query";
import { fetchTributeList, fetchMyTributeList } from "@apis/tribute";
import Pagination from "@components/ui/Pagination";

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
  console.log("gg", allWreathList);
  // fetch 관련, 추후 옮길 것.
  const { isError: isTributeListError, error: tributeListError } = useQuery(
    ["tributeList"],
    fetchTributeList,
    {
      onSuccess: (data) => {
        const sortedData = sortWreathList(data.data, sortOption);
        setAllWreathList({ data: sortedData });
        setWreathList({ data: sortedData });
      },
    }
  );

  if (isTributeListError)
    console.error("Error fetching the tribute list", tributeListError);

  const { isError: isMyTributeListError, error: myTributeListError } = useQuery(
    ["mytributeList"],
    fetchMyTributeList,
    {
      onSuccess: (data) => {
        const sortedData = sortWreathList(data.data, sortOption);
        setMyWreathList({ data: sortedData });
      },
    }
  );

  if (isMyTributeListError)
    console.error("Error fetching my tribute list", myTributeListError);

  // 정렬 옵션
  const [sortOption, setSortOption] = useState(1);
  console.log(sortOption);

  const selectSortoption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSortOption(selectedValue);
    console.log(selectedValue);
  };

  const selectSort = [
    { value: "1", innertext: "남은 날짜 순", id: 1 },
    { value: "2", innertext: "헌화 개수 순", id: 2 },
  ];

  useEffect(() => {
    const sortedData = sortWreathList(wreathList.data, sortOption);
    setWreathList({ data: sortedData });
  }, [sortOption]);

  // 검색 옵션
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredWreathList = wreathList.data.filter((wreath) =>
    wreath.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.Wrapper}>
      <Pagination prev="헌화" prevPath={`/tribute/main`} />
      <div className={styles.listWrapper}>
        <div className={styles.searchWraper}>
          <Input
            placeholder="헌화 제목 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="regular"
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
          <div className={styles.eventCardWrapper}>
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
                      {getEventTimeInfo(wreath.startDate, wreath.endDate)}
                    </div>
                    {/* <p>{wreath.subTitle}</p> */}
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
function getEventTimeInfo(startDate: string, endDate: string): string {
  const end = new Date(endDate);
  // const start = new Date(startDate);
  const now = new Date();

  if (now > end) {
    // If the event is over, return the date range
    return `${startDate} - ${endDate}`;
  } else {
    // Otherwise, return the remaining days
    const differenceInTime = end.getTime() - now.getTime();
    const remainingDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return `헌화 종료 까지 ${remainingDays} days`;
  }
}

function getSortingValue(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (now > end) {
    // 이벤트가 끝났을 경우, 진행 기간을 반환합니다.
    const durationInTime = end.getTime() - start.getTime();
    return -durationInTime; // 음수를 반환하여 끝난 이벤트를 배열의 끝으로 보냅니다.
  } else {
    // 그렇지 않을 경우, 남은 날짜를 반환합니다.
    const remainingInTime = end.getTime() - now.getTime();
    return remainingInTime;
  }
}

function sortWreathList(data: Wreath[], option: number): Wreath[] {
  let sortedData = [...data]; // 데이터 복사

  switch (option) {
    case 1:
      sortedData.sort(
        (a, b) =>
          getSortingValue(a.startDate, a.endDate) -
          getSortingValue(b.startDate, b.endDate)
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
