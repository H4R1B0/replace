import Payphone from "@components/3d/Payphone";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

import styles from "./PayphonePage.module.css";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchVoicemailList,
  fetchVoicemail,
  deleteVoicemail,
} from "@apis/payphone";

import Modal from "@components/ui/Modal";
import Button from "@components/ui/Button";
import RegisterVoicemailModal from "@components/ui/Modal/RegisterVoicemailModal";

import AudioPlayer from "@components/ui/AudioPlayer";
import { AudioData } from "audio-react-recorder";

// 리스트 불러오기 위한 State
type Voicemail = {
  voicemailId: number;
  sendDate: string;
  fromUserNickname: string;
  voicemailUrl?: string;
};

type VoicemailList = {
  voicemails: Voicemail[];
};

export default function PayphonePage() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL;
  const accessToken: string | null = sessionStorage.getItem("accessToken");
  // 방문한 페이지의 주인을 찾기 위함.
  const nowUrl = window.location.href;
  const urlSplit = decodeURIComponent(nowUrl.split("/").pop() ?? "").split("?");
  const houseUserNickname = urlSplit[urlSplit.length - 1];
  // 나와 방문자를 구분할 코드
  // const isMe = houseUserNickname === sessionStorage.getItem("nickname");
  const isMe = false;
  // 등록 props를 위한 값
  const [audioData, setAudioData] = useState<AudioData | null>(null);

  // 모달 열고 닫기 위한 State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 디테일 모달
  const [detailModalOpen, setdetailModalOpen] = useState<boolean>(false);

  // 리스트 가져오기
  const [detailVoicemail, setDetailVoicemail] = useState<Voicemail>({
    voicemailId: 0,
    sendDate: "",
    fromUserNickname: "",
    voicemailUrl: "",
  });

  const [voicemailListState, setVoicemailListState] = useState<VoicemailList>({
    voicemails: [],
  });

  const [voicemailId, setVoicemailId] = useState<number>(0);

  // useEffect(() => {
  //   getVoicemailList();
  // }, []);

  const {
    isLoading,
    isError,
    data: voicemailList,
  } = useQuery<VoicemailList, Error>(
    ["voicemailList"],
    () => fetchVoicemailList(),
    {
      enabled: !!houseUserNickname,
      onSuccess: (data) => {
        setVoicemailListState(data);
        console.log("data", data);
      },
    }
  );
  if (isLoading) return "loading";
  if (isError) return `Error`;

  // const getVoicemailList = async () => {
  //   fetch(`${BASE_URL}/voicemail`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       // 에러 코드에 따른 상태 관리를 위해 추가
  //       if (!response.ok) {
  //         throw new Error(`${response.status} 에러 발생`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("data", data);
  //       console.log("response", data.voicemails);
  //       setVoicemailList(data.voicemails);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // 디테일 모달
  // const { data: detailVoicemail, isLoading: isDetailLoading } = useQuery<Voicemail, Error>(
  // const { isError: isDetailError, isLoading: isDetailLoading } = useQuery<
  //   Voicemail,
  //   Error
  // >(["voicemailDetail", voicemailId], () => fetchVoicemail(voicemailId), {
  //   enabled: !!voicemailId,
  //   onSuccess: (data) => {
  //     setDetailVoicemail(data);
  //   },
  // });
  // if (isDetailLoading) return "loading";
  // if (isDetailError) return `Error`;

  // const getVoicemailDetail = async (voicemailId: number) => {
  //   fetch(`${BASE_URL}/voicemail/${voicemailId}`)
  //     .then((response) => {
  //       // 에러 코드에 따른 상태 관리를 위해 추가
  //       if (!response.ok) {
  //         throw new Error(`${response.status} 에러 발생`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("data", data.Response);
  //       setDetailVoicemail(data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const detailModal = (voicemailId: number) => {
    console.log(`클릭된 voicemail의 voicemailId: ${voicemailId}`);
    // getVoicemailDetail(voicemailId);
    setdetailModalOpen(true);
  };

  const handleDetailModal = (voicemailId: number) => {
    setVoicemailId(voicemailId);
    detailModal(voicemailId);
  };

  // 삭제하기
  const deleteMutation = useMutation(deleteVoicemail, {
    onSuccess: () => {
      alert("삭제되었습니다.");
      setDetailVoicemail({
        voicemailId: 0,
        sendDate: "",
        fromUserNickname: "",
        voicemailUrl: "",
      }); // 선택한 책을 삭제한 후 null로 설정
    },
    onError: (error) => {
      console.error("삭제 에러", error);
    },
  });

  const handleDeleteVoicemail = () => {
    if (detailVoicemail) {
      deleteMutation.mutate(detailVoicemail.voicemailId);
    }
  };

  // const deleteVoicemail = async (voicemailId: number) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/voicemail/${voicemailId}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }

  //     // 음성 녹음 삭제 후 새로운 데이터를 불러오는 함수 호출
  //     await getVoicemailList();

  //     alert("삭제 완료");
  //   } catch (error) {
  //     console.error("에러", error);
  //   }
  // };

  // 등록하기
  const RegistVoicemail = async (audioData: AudioData | null) => {
    if (!audioData) {
      console.error("오디오 데이터가 없습니다.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", audioData.blob as File);
      console.log("audioData", audioData);
      const requestData = {
        toUserNickname: houseUserNickname,
      };
      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );
      formData.append("file", audioData.blob as File);
      console.log("audioData", audioData);
      const requestData = {
        toUserNickname: houseUserNickname,
      };
      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      const response = await fetch(`${BASE_URL}/voicemail`, {
      const response = await fetch(`${BASE_URL}/voicemail`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData, // 수정된 부분
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData, // 수정된 부분
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      alert("등록 완료이 완료");
      setAudioData(null);
      setModalOpen(false);
      // 음성 메시지 목록에 데이터 추가
      // const data = await response.json();
      // setVoicemailList((prevVoicemailList) => [
      //   ...prevVoicemailList,
      //   data.Response,
      // ]);
      // 음성 메시지 목록에 데이터 추가
      // const data = await response.json();
      // setVoicemailList((prevVoicemailList) => [
      //   ...prevVoicemailList,
      //   data.Response,
      // ]);
    } catch (error) {
      console.error("에러", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 25, position: [0, 0, 8] }}
        style={{ touchAction: "none" }}
      >
        {/* <OrbitControls /> */}
        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
            snap
            global
            zoom={2.0}
            rotation={[0, -Math.PI / 2.5, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Selection>
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  blur
                  visibleEdgeColor={0xffffff}
                  edgeStrength={100}
                  width={1000}
                />
              </EffectComposer>
              <Payphone onPayphoneClick={openModal} />
            </Selection>
          </PresentationControls>
        </Stage>
      </Canvas>
      {/* 모달 부분 구현 -> 로그인 구현 이후에 유저/방문자 기능 분리하기  */}
      <div>
        {/* 방문자인 경우 */}
        {isMe ? (
          <Modal
            modalOpen={modalOpen}
            onClose={closeModal}
            title="다른 사람이 남긴 기록을 확인해보세요"
            buttonLabel="닫기"
          >
            {voicemailList &&
              voicemailListState.voicemails.map((voicemail: Voicemail) => (
                <p
                  onClick={() => detailModal(voicemail.voicemailId)}
                  key={voicemail.voicemailId}
                >
                  {voicemail.fromUserNickname}
                  {voicemail.fromUserNickname}
                  {voicemail.sendDate}
                </p>
              ))}
          </Modal>
        ) : (
          <RegisterVoicemailModal />
        )}

        {/* 두번째 디테일 모달 */}
        {detailModalOpen && (
          <Modal
            modalOpen={modalOpen}
            onClose={closeModal}
            title="다른 사용자가 남긴 목소리를 들어보세요"
            buttonLabel="닫기"
          >
            {detailVoicemail && detailVoicemail.voicemailUrl && (
            {detailVoicemail && detailVoicemail.voicemailUrl && (
              <AudioPlayer url={detailVoicemail.voicemailUrl} />
            )}
            <Button onClick={() => setdetailModalOpen(false)}>뒤로가기</Button>
            {detailVoicemail && (
              <Button variant="regular" onClick={handleDeleteVoicemail}>
                음성 삭제하기
              </Button>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}
