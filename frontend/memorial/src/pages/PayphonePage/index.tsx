import Payphone from "@components/3d/Payphone";
import { Canvas } from "@react-three/fiber";
import {
  Stage,
  PresentationControls,
  Environment,
  Stars,
  Cloud,
} from "@react-three/drei";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import { useState } from "react";

import styles from "./PayphonePage.module.css";

import RegisterVoicemailModal from "@components/ui/Modal/RegisterVoicemailModal";
import VoiceMailListModal from "@components/ui/Modal/VoiceMailListModal";
import Pagination from "@components/ui/Pagination";

export default function PayphonePage() {
  const nowUrl = window.location.href;
  const urlSplit = decodeURIComponent(nowUrl.split("/").pop() ?? "").split("?");
  const houseUserNickname = urlSplit[urlSplit.length - 1];
  // 나와 방문자를 구분할 코드
  const isMe = houseUserNickname === sessionStorage.getItem("nickname");
  const nickname = sessionStorage.getItem("nickname");

  const [modalOpen, setModalOpen] = useState(false); // 모달 열고 닫는 상태를 관리하기 위한 State

  const openModal = () => {
    setModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const choiceModal = () => {
    if (isMe) {
      return <VoiceMailListModal isOpen={modalOpen} onClose={closeModal} />;
    } else {
      return <RegisterVoicemailModal isOpen={modalOpen} onClose={closeModal} />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Pagination
        prev="집"
        next="헌화"
        prevPath={`/house/${nickname}`}
        nextPath={`/tribute/main`}
      />
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 25, position: [0, 0, 8] }}
        style={{ touchAction: "none" }}
        className={styles.canvas}
      >
        {/* <OrbitControls /> */}
        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
            snap
            global
            zoom={1.5}
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

        <Environment preset="sunset" />
        <Cloud
          scale={3}
          opacity={0.3}
          depth={-12} // Z-dir depth
          segments={20} // Number of particles
        />
        <Stars
          radius={100}
          depth={1}
          count={5000}
          factor={4}
          saturation={5}
          fade
        />
        <ambientLight intensity={0.5} />
      </Canvas>
      {choiceModal()}
    </div>
  );
}
