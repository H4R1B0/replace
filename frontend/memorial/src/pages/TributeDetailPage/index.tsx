import { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import Modal from "@components/ui/Modal";
import Tribute from "@components/3d/Tribute";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import styles from "./TributeDetailPage.module.css";
import Button from "@components/ui/Button";

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

type ReportDetail = {
  declarationType: number;
  declarationContent: string;
  wreathId: number;
};

type myTribute = {
  wreathId: number;
  wreathItem: string;
};

export default function TributeDetailPage() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  // 모달 관련 변수
  const [tributeModalOpen, setTributeModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // 디테일 페이지 params를 받아오기 위한 변수
  let { wreathid } = useParams();
  const wreathIdNumber = wreathid ? parseInt(wreathid) : 0;

  //페이지 이동을 위해 넣어둠
  const navigate = useNavigate();

  // 모달 내 데이터 다시 불러오기 위한 변수. 쿼리로 변경 후 삭제
  const [reloadWreathDetail, setReloadWreathDetail] = useState(false);

  //서버로 보내기 위한 데이터 변수
  const [wreathDetail, setWreathDetail] = useState<WreathDetail>();
  const [reportDetail, setReportDetail] = useState<ReportDetail>({
    declarationType: 1,
    declarationContent: "",
    wreathId: wreathIdNumber,
  });

  const [myTribute, setMyTribute] = useState<myTribute>({
    wreathId: wreathIdNumber,
    wreathItem: "",
  });

  // const userToken = sessionStorage.getItem("accessToken");
  const userToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmITspIAiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjk2MDQ5MDI1fQ.o0J4hHjslvrCVx78menpOJ7X3QilPTrBpTkryI-fnSs";
  //fetch 관련

  // 1. 디테일 정보 불러오는 함수
  useEffect(() => {
    fetch(`${BASE_URL}/wreath/${wreathid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error(`${res.status} 에러 발생`);
        }
        console.log("결과", res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWreathDetail(data);
      });
  }, [reloadWreathDetail]);
  // 2. 헌화하기 함수
  const submitWreath = () => {
    fetch(`${BASE_URL}/wreath`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(myTribute),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        alert("헌화 완료");
        setTributeModalOpen(false);
        setReloadWreathDetail((prev) => !prev);
        return res.json();
      })
      .catch((error) => {
        console.error("에러났음~~", error);
      });
  };

  console.log("myTribute", myTribute);
  //3. 신고하기 함수
  const submitReport = () => {
    fetch(`${BASE_URL}/wreath/declaration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportDetail),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        alert("신고 완료");
        setReportModalOpen(false);
        setReportDetail({
          declarationType: 1,
          declarationContent: "",
          wreathId: wreathIdNumber,
        });
        return res.json();
      })
      .catch((error) => {
        console.error("에러났음~~", error);
      });
  };

  // 입력값 저장하는 함수
  const onChangeReport = (e: any) => {
    setReportDetail({
      ...reportDetail,
      [e.target.name]: e.target.value,
      declarationType: parseInt(e.target.value),
    });
  };

  const onChangetribute = (e: any) => {
    setMyTribute({
      ...myTribute,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(reportDetail);
  // console.log(myTribute);

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonwrapper}>
        <p onClick={() => navigate("/tribute/list")}>뒤로가기</p>
        <p onClick={() => setReportModalOpen(true)}>신고하기</p>
      </div>
      <div className={styles.titlewrapper}>
        <p className={styles.title}>{wreathDetail?.title}</p>
        <p>{wreathDetail?.subTitle}</p>
      </div>
      <Canvas
        style={{
          paddingLeft: "6%",
          width: "100%",
          height: "25rem",
          touchAction: "none",
        }}
        flat
        dpr={[1, 2]}
        camera={{ fov: 10, position: [0, 0, 0.5] }}
      >
        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
            snap
            global
            rotation={[0, -Math.PI / 3.8, 0]}
            polar={[0, 0]}
            azimuth={[-Math.PI / 8, Math.PI / 8]}
          >
            <pointLight position={[90, 10, 10]} />
            <Selection>
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  blur
                  visibleEdgeColor={0xffffff}
                  edgeStrength={100}
                  width={1000}
                />
              </EffectComposer>

              <Tribute />
            </Selection>
          </PresentationControls>
        </Stage>
      </Canvas>
      <Outlet />
      <div className={styles.button}>
        <Button onClick={() => setTributeModalOpen(true)}>헌화 시작하기</Button>
      </div>
      <Modal
        modalOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title="헌화 내용 신고하기"
        buttonLabel="뒤로 가기"
      >
        <div>
          <p>신고 분류를 선택해주세요.</p>
          <select name="declarationType" onChange={onChangeReport}>
            <option value="1">스팸/도배글</option>
            <option value="2">잘못된 정보 포함</option>
            <option value="3">개인 정보 포함</option>
            <option value="4">욕설/생명경시</option>
            <option value="5">혐오/차별적</option>
          </select>
          <p>신고 내용을 작성해주세요.</p>
          <input
            name="declarationContent"
            onChange={onChangeReport}
            type="text"
          />
        </div>

        <button onClick={submitReport}>신고하기</button>
      </Modal>
      <Modal
        modalOpen={tributeModalOpen}
        onClose={() => setTributeModalOpen(false)}
        title="헌화를 남겨보세요."
        buttonLabel="확인"
      >
        <div className={styles.tribute}>
          <div className={styles.imgWrapper}>
            <div className={styles.imgBox}>
              <img
                src="https://i.imgur.com/sUYpQGX.jpg"
                alt="flower"
                className={styles.img}
              />
              <div>
                <input
                  type="radio"
                  name="wreathItem"
                  value="flower"
                  id="flower"
                  defaultChecked
                  onChange={onChangetribute}
                />
                <label htmlFor="flower">꽃</label>
              </div>
              설명 글 생각보다 길 지도 모르는 설명글
            </div>
            <div>
              <img
                src="https://i.imgur.com/Y4HyGbU.jpg"
                alt="flower"
                className={styles.img}
              />
              <div>
                <input
                  type="radio"
                  name="wreathItem"
                  value="candle"
                  id="candle"
                  onChange={onChangetribute}
                />
                <label htmlFor="flower">초</label>
              </div>
              설명 글 생각보다 길 지도 모르는 설명글
            </div>
            <div>
              <img
                src="https://i.imgur.com/qFuiPLe.png"
                alt="flower"
                className={styles.img}
              />
              <div>
                <input
                  type="radio"
                  name="wreathItem"
                  value="ribbon"
                  id="ribbon"
                  onChange={onChangetribute}
                />
                <label htmlFor="flower">리본</label>
              </div>
              설명 글 생각보다 길 지도 모르는 설명글
            </div>
          </div>
          <div className={styles.btn}>
            <Button onClick={submitWreath}>헌화 남기기</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
