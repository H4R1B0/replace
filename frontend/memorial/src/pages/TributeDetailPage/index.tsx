import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "@components/ui/Modal";

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

  const [tributeModalOpen, setTributeModalOpen] = useState(false);

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
      <button onClick={() => setTributeModalOpen(true)}>헌화 시작하기</button>
      <Modal
        modalOpen={tributeModalOpen}
        onClose={() => setTributeModalOpen(false)}
        title="헌화를 남겨보세요."
        buttonLabel="확인"
      >
        <div>
          <input type="radio" name="flower" id="flower" />
          <label htmlFor="flower">Flower</label>
        </div>
      </Modal>
    </div>
  );
}
