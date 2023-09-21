import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type WreathDetail = {
  wreathId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  flower: number;
  candle: number;
  ribbon: number;
};

export default function TributeDetailPage() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  let { wreathid } = useParams();
  const navigate = useNavigate();
  // console.log(wreathid);

  const [wreathDetail, setWreathDetail] = useState<WreathDetail>();

  useEffect(() => {
    fetch(`${BASE_URL}/wreath/${wreathid}`)
      .then((res) => res.json())
      .then((data) => {
        setWreathDetail(data.response);
        console.log(data.response);
      });
  }, []);
  return (
    <div>
      <p>제목: {wreathDetail?.title}</p>
      <p>부제목: {wreathDetail?.subTitle}</p>
      {/* <p>설명: {wreathDetail?.description}</p> */}
      <p>
        추모 기간 : {wreathDetail?.startDate} ~ {wreathDetail?.endDate}
      </p>
      <p>{wreathDetail?.flower}</p>
      <p>{wreathDetail?.candle}</p>
      <p>{wreathDetail?.ribbon}</p>

      <button onClick={() => navigate("/tribute/list")}>뒤로가기</button>
    </div>
  );
}
