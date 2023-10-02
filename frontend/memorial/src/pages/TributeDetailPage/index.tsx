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
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchTributeDetail,
  updateTribute,
  fetchReportDetail,
} from "@apis/tribute";
import Select from "@components/ui/Select/index";
import Textarea from "@components/ui/Textarea";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
  const [tributeDetailModalOpen, setTributeDetailModalOpen] = useState(false);
  const [tributeModalOpen, setTributeModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  // const [aftertributeModalOpen, setAftertributeModalOpen] = useState(false);
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

  console.log(reportDetail);
  const [myTribute, setMyTribute] = useState<myTribute>({
    wreathId: wreathIdNumber,
    wreathItem: "flower",
  });

  console.log(myTribute);
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
  const queryClient = useQueryClient();
  const tributeMutation = useMutation(updateTribute, {
    onSuccess: () => {
      queryClient.refetchQueries(["wreathDetail", wreathIdNumber]);
      setTributeModalOpen(false);
      setShowImage(true);
    },
    onError: (error: Error) => {
      if (error.message === "400") {
        toast.error("이미 완료된 헌화입니다."), { id: "alreadyDone" };
        setTributeModalOpen(false);
      } else {
        console.error("에러 발생", error);
      }
    },
  });

  const getImageSrc = () => {
    switch (myTribute.wreathItem) {
      case "flower":
        return "https://i.imgur.com/M4no7Mz.png";
      case "candle":
        return "https://i.imgur.com/3CuHLf4.png";
      case "ribbon":
        return "https://i.imgur.com/W3MR2dx.png";
      default:
        return "https://i.imgur.com/M4no7Mz.png"; // default image
    }
  };

  const submitWreath = () => {
    tributeMutation.mutate(myTribute);
  };

  const reportSuccess = async () => {
    toast.success("신고가 완료되었습니다."), { id: "reportSuccess" };
  };

  console.log("myTribute", wreathDetail);
  console.log("myTribute", myTribute);
  const reportMutation = useMutation(fetchReportDetail, {
    onSuccess: () => {
      setReportModalOpen(false);
      setReportDetail({
        declarationType: 1,
        declarationContent: "",
        wreathId: wreathIdNumber,
      });
      reportSuccess();
    },
    onError: (error: Error) => {
      console.error("에러 발생", error);
      if (error.message === "400") {
        toast.error("이미 신고했던 헌화입니다."), { id: "alreadyDone" };
      }
    },
  });

  const submitReport = () => {
    reportMutation.mutate(reportDetail);
  };

  // 입력값 저장하는 함수
  const onChangeReport = (name: string, value: any) => {
    setReportDetail({
      ...reportDetail,
      [name]: value,
    });
  };

  const onChangetribute = (e: any) => {
    setMyTribute({
      ...myTribute,
      [e.target.name]: e.target.value,
    });
  };

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let timerId: number;
    if (showImage) {
      timerId = window.setTimeout(() => {
        setShowImage(false);
        toast.success("헌화가 완료되었습니다."), { id: "submitTributeSuccess" };
      }, 4000);
    }
    return () => {
      window.clearTimeout(timerId);
    };
  }, [showImage]);

  const declationOptions = [
    { value: 1, innertext: "스팸/도배글", id: 1 },
    { value: 2, innertext: "잘못된 정보 포함", id: 2 },
    { value: 3, innertext: "개인 정보 포함", id: 3 },
    { value: 4, innertext: "욕설/생명경시", id: 4 },
    { value: 5, innertext: "혐오/차별적", id: 5 },
  ];

  return (
    <div className={styles.wrapper}>
      {showImage && (
        <div className={styles.aftertributewrapper}>
          <img
            src={getImageSrc()}
            alt="Floating Image"
            className={styles.submittributeImg}
          />
        </div>
      )}
      <div className={styles.buttonwrapper}>
        <div
          onClick={() => navigate("/tribute/list")}
          className={styles.navBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.icon}
          >
            <path
              fill-rule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clip-rule="evenodd"
            />
          </svg>
          <p>뒤로가기</p>
        </div>
        <div onClick={() => setReportModalOpen(true)} className={styles.navBtn}>
          {/* <p>신고하기</p> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.icon}
          >
            <path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z" />
          </svg>
        </div>
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

              <Tribute
                onTributeClick={() => setTributeDetailModalOpen(true)}
                flowerVisibility={
                  wreathDetail ? wreathDetail.flower > 0 : false
                }
                ribbonVisibility={
                  wreathDetail ? wreathDetail.ribbon > 0 : false
                }
              />
            </Selection>
          </PresentationControls>
        </Stage>
      </Canvas>
      <Outlet />

      <div className={styles.button}>
        <Button onClick={() => setTributeModalOpen(true)}>헌화 시작하기</Button>
      </div>
      <Modal
        modalOpen={tributeDetailModalOpen}
        onClose={() => setTributeDetailModalOpen(false)}
        title={wreathDetail?.title}
        buttonLabel="돌아가기"
      >
        <div className={styles.framebody}>
          <p>{wreathDetail?.description}</p>
        </div>
      </Modal>
      {/* <Modal
        modalOpen={aftertributeModalOpen}
        onClose={() => setAftertributeModalOpen(false)}
        title="헌화가 완료 되었습니다."
        buttonLabel="뒤로 가기"
      ></Modal> */}
      <Modal
        modalOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title="헌화 내용 신고하기"
        buttonLabel="뒤로 가기"
      >
        <div className={styles.reportWrapper}>
          <p className={styles.reportSub}>신고 분류를 선택해주세요.</p>
          <Select
            name="declarationType"
            onChange={onChangeReport}
            children={declationOptions}
          />

          <p className={styles.reportSub}>신고 내용을 작성해주세요.</p>
          <Textarea
            name="declarationContent"
            onChange={(e) => onChangeReport(e.target.name, e.target.value)}
            placeholder="신고 사유를 상세히 적어주세요."
          />
        </div>

        <Button onClick={submitReport}>신고하기</Button>
      </Modal>
      <Modal
        modalOpen={tributeModalOpen}
        onClose={() => setTributeModalOpen(false)}
        title="헌화를 남겨보세요."
        buttonLabel="확인"
        noButton={true}
      >
        <div className={styles.tribute}>
          <div className={styles.imgWrapper}>
            <div className={styles.imgBox}>
              <img
                src="https://i.imgur.com/VHxNICU.png"
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
                <br />
                <label htmlFor="flower" className={styles.label}>
                  꽃
                </label>
              </div>
              <div className={styles.text}> 애도의 의미를 담은 꽃 한 송이</div>
            </div>
            <div className={styles.imgBox}>
              <img
                src="https://i.imgur.com/xl4AeHJ.png"
                alt="ribbon"
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
                <br />
                <label htmlFor="flower" className={styles.label}>
                  초
                </label>
              </div>
              <div className={styles.text}>가는 길을 따뜻하게 비춰줄 초</div>
            </div>
            <div className={styles.imgBox}>
              <img
                src="https://i.imgur.com/Yp6Q4fm.png"
                alt="candle"
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
                <br />
                <label htmlFor="flower" className={styles.label}>
                  리본
                </label>
              </div>
              <div className={styles.text}>다시 만남을 약속하는 리본</div>
            </div>
          </div>
          <div className={styles.btn}>
            <Button onClick={submitWreath}>헌화 남기기</Button>
            <Button onClick={() => setTributeModalOpen(false)}>
              뒤로 가기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
