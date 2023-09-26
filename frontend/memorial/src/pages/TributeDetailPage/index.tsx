import { useState } from "react";
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
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchTributeDetail,
  updateTribute,
  fetchReportDetail,
} from "@apis/tribute";

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
  // 모달 관련 변수
  const [tributeModalOpen, setTributeModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // 디테일 페이지 params를 받아오기 위한 변수
  let { wreathid } = useParams();
  const wreathIdNumber = wreathid ? parseInt(wreathid) : 0;

  //페이지 이동을 위해 넣어둠
  const navigate = useNavigate();

  //서버로 보내기 위한 데이터 변수
  const [wreathDetail, setWreathDetail] = useState<WreathDetail>();
  const [reportDetail, setReportDetail] = useState<ReportDetail>({
    declarationType: 1,
    declarationContent: "",
    wreathId: wreathIdNumber,
  });

  const [myTribute, setMyTribute] = useState<myTribute>({
    wreathId: wreathIdNumber,
    wreathItem: "flower",
  });

  const { isError: isWreathDetailError, error: wreathDetailError } = useQuery<
    WreathDetail,
    Error
  >(
    ["wreathDetail", wreathIdNumber],
    () => fetchTributeDetail(wreathIdNumber),
    {
      enabled: !!wreathIdNumber,
      onSuccess: (data) => {
        setWreathDetail(data);
      },
    }
  );

  if (isWreathDetailError && wreathDetailError) {
    console.error("wreath Detail Fetch Error:", wreathDetailError);
  }

  const tributeMutation = useMutation(updateTribute, {
    onSuccess: () => {
      alert("헌화 완료");
      setTributeModalOpen(false);
    },
    onError: (error: Error) => {
      if (error.message === "400") {
        alert("이미 완료한 헌화입니다.");
        setTributeModalOpen(false);
      } else {
        console.error("에러 발생", error);
      }
    },
  });

  const submitWreath = () => {
    tributeMutation.mutate(myTribute);
  };

  console.log("myTribute", reportDetail);

  const reportMutation = useMutation(fetchReportDetail, {
    onSuccess: () => {
      alert("신고 완료");
      setReportModalOpen(false);
      setReportDetail({
        declarationType: 1,
        declarationContent: "",
        wreathId: wreathIdNumber,
      });
    },
    onError: (error: Error) => {
      console.error("에러 발생", error);
    },
  });

  const submitReport = () => {
    reportMutation.mutate(reportDetail);
  };

  // 입력값 저장하는 함수
  const onChangeReport = (e: any) => {
    const { name, value } = e.target;

    if (name === "declarationType") {
      setReportDetail({
        ...reportDetail,
        [name]: parseInt(value),
      });
    } else {
      setReportDetail({
        ...reportDetail,
        [name]: value,
      });
    }
  };

  const onChangetribute = (e: any) => {
    setMyTribute({
      ...myTribute,
      [e.target.name]: e.target.value,
    });
  };

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
