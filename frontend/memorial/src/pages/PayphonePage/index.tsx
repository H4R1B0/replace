import Payphone from "@components/3d/Payphone";
import Modal from "@components/ui/Modal";
import Recorder from "@components/ui/Recorder";
import Button from "@components/ui/Button";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import styles from "./PayphonePage.module.css";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { registVoicemail } from "@apis/payphone";
import { deleteSingleVoicemail } from "@apis/payphone";
import { fetchVoicemailList } from "@apis/payphone";

export default function PayphonePage() {
  // 모달 열고 닫기 위한 State
  const [modalOpen, setModalOpen] = useState(false);

  // 리스트 불러오기 위한 State
  const [voicemailList, setVoicemailList] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // react-query
  const queryClient = useQueryClient();
  // 등록하기
  const registVoicemailMutation = useMutation({
    mutationFn: registVoicemail,
    onSuccess: () => {
      queryClient.invalidateQueries(["voicemail"]);
      alret("등록되었습니다.");
    },
    onError: (error) => {
      // 에러 처리 작업 추가
      console.error("등록 에러:", error);
      alret("등록에 실패했습니다.");
    },
  });

  const handleRegist = () => {
    registVoicemailMutation.mutate();
  };

  // 삭제하기
  const deleteVoiceMailMutation = useMutation({
    mutationFn: deleteSingleVoicemail,
    onSuccess: () => {
      queryClient.invalidateQueries(["voicemail"]);
      alret("삭제되었습니다.");
    },
    onError: (error) => {
      // 에러 처리 작업 추가
      console.error("삭제 에러:", error);
      alret("삭제에 실패했습니다.");
    },
  });

  const handleDelete = () => {
    deleteVoiceMailMutation.mutate();
  };

  // 리스트 가져오기
  const handleGet = async () => {
    try {
      const response = await fetchVoicemailList(); // API로부터 Voicemail 리스트를 불러옴
      setVoicemailList(response.data.voicemailList);
    } catch (error) {
      console.error("리스트 호출 에러:", error);
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
        {/* <Modal
          modalOpen={modalOpen}
          onClose={closeModal}
          title="이 순간을 음성으로 남기시겠습니까?"
          buttonLabel="닫기"
        >
          <Recorder />
          <Button onClick={handleRegist}>저장하기</Button>
          <Button onClick={handleDelete}>삭제하기</Button>
        </Modal> */}
        {/* 유저 본인인 경우 */}
        <Modal
          modalOpen={modalOpen}
          onClose={closeModal}
          title="다른 사람이 남긴 기록을 확인해보세요"
          buttonLabel="닫기"
        >
          <Button onClick={handleGet}>불러오기</Button>
          {voicemailList.map((voicemail) => (
            <p key={voicemail.voicemailId}>{voicemail.fromNickname}</p>
          ))}
        </Modal>
      </div>
    </div>
  );
}
