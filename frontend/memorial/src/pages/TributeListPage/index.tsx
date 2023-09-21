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
        setWreathList(data.response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
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
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
