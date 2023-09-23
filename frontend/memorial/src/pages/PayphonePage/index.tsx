import Payphone from "@components/3d/Payphone";
import Modal from "@components/ui/Modal";
import Recorder from "@components/ui/Recorder";
import Button from "@components/ui/Button";
import AudioPlayer from "@components/ui/AudioPlayer";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import styles from "./PayphonePage.module.css";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import { useEffect } from "react";

export default function PayphonePage() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  // 등록 props를 위한 값
  const [audioData, setAudioData] = useState<Blob | null>(null);

  // 나와 방문자를 구분할 코드
  const isMe = false;

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

  const [detailVoicemail, setDetailVoicemail] = useState<Voicemail | null>();

  // 리스트 불러오기 위한 State
  interface Voicemail {
    voicemailId: number;
    sendDate: string;
    voicemailUrl: string;
    fromUser: string;
    toUser: string;
  }
  const [voicemailList, setVoicemailList] = useState<Voicemail[]>([]);
  // 리스트 가져오기
  useEffect(() => {
    getVoicemailList();
  }, []);

  const getVoicemailList = async () => {
    fetch(`${BASE_URL}/api/voicemail`)
      .then((response) => {
        // 에러 코드에 따른 상태 관리를 위해 추가
        if (!response.ok) {
          throw new Error(`${response.status} 에러 발생`);
        }
        console.log("res", response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data.Response.voicemailList);
        setVoicemailList(data.Response.voicemailList);
      })
      .catch((error) => console.log(error));
  };

  const getVoicemailDetail = async (voicemailId: number) => {
    fetch(`${BASE_URL}/api/voicemail/${voicemailId}`)
      .then((response) => {
        // 에러 코드에 따른 상태 관리를 위해 추가
        if (!response.ok) {
          throw new Error(`${response.status} 에러 발생`);
        }
        console.log("res", response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data.Response);
        setDetailVoicemail(data.Response);
      })
      .catch((error) => console.log(error));
  };

  function detailModal(voicemailId: number) {
    console.log(`클릭된 voicemail의 voicemailId: ${voicemailId}`);
    getVoicemailDetail(voicemailId);
    setdetailModalOpen(true);
  }

  // 삭제하기
  const deleteVoicemail = async (voicemailId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/voicemail/${voicemailId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // 음성 녹음 삭제 후 새로운 데이터를 불러오는 함수 호출
      await getVoicemailList();

      alert("삭제 완료");
    } catch (error) {
      console.error("에러", error);
    }
  };

  // 등록하기
  const RegistVoicemail = async (audioData: Blob | null) => {
    if (!audioData) {
      console.error("오디오 데이터가 없습니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("audio", audioData);

      const response = await fetch(`${BASE_URL}/api/voicemail`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // 음성메세지 목록에 데이터 추가
      const data = await response.json();
      setVoicemailList((prevVoicemailList) => [
        ...prevVoicemailList,
        data.Response,
      ]);
      alert("등록 완료이 완료");
      setAudioData(null);
      setModalOpen(false);
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
        {isMe ? null : (
          <Modal
            modalOpen={modalOpen}
            onClose={closeModal}
            title="이 순간을 음성으로 남기시겠습니까?"
            subtitle="가장 아름다운 목소리를 들려주세요. 등록한 음성은 삭제하실 수 없습니다."
            buttonLabel="닫기"
          >
            <Recorder onAudioDataReceived={(data) => setAudioData(data)} />
            <Button onClick={() => RegistVoicemail(audioData)}>저장하기</Button>
          </Modal>
        )}

        {/* 유저 본인인 경우 */}
        {isMe ? (
          <Modal
            modalOpen={modalOpen}
            onClose={closeModal}
            title="다른 사람이 남긴 기록을 확인해보세요"
            buttonLabel="닫기"
          >
            {voicemailList &&
              voicemailList.map((voicemail: Voicemail) => (
                <p
                  onClick={() => detailModal(voicemail.voicemailId)}
                  key={voicemail.voicemailId}
                >
                  {voicemail.fromUser}
                  {voicemail.sendDate}
                </p>
              ))}
          </Modal>
        ) : null}
        {/* 두번째 디테일 모달 */}
        {detailModalOpen && (
          <Modal
            modalOpen={modalOpen}
            onClose={closeModal}
            title="다른 사용자가 남긴 목소리를 들어보세요"
            buttonLabel="닫기"
          >
            {detailVoicemail && (
              <AudioPlayer url={detailVoicemail.voicemailUrl} />
            )}
            <Button onClick={() => setdetailModalOpen(false)}>뒤로가기</Button>
            {detailVoicemail && (
              <Button
                onClick={() => deleteVoicemail(detailVoicemail.voicemailId)}
              >
                음성 삭제하기
              </Button>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}
