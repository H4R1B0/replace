import Library from "@components/3d/Library";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import styles from "./LibraryPage.module.css";
import Modal from "@components/ui/Modal";
import { useState } from "react";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

export default function LibraryPage() {
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 8] }}
        style={{ touchAction: "none" }}
      >
        <color attach="background" args={["#e0b7ff"]} />
        <Stage environment="city" intensity={0.5} adjustCamera>
          <PresentationControls
            snap
            global
            zoom={1.5}
            rotation={[0, -Math.PI / 4, 0]}
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
              <Library
                onLetterClick={() => setLetterModalOpen(true)}
                onBookShelfClick={() => setBookModalOpen(true)}
              />
            </Selection>
          </PresentationControls>
        </Stage>
      </Canvas>
      <Modal
        modalOpen={letterModalOpen}
        onClose={() => setLetterModalOpen(false)}
        title="모달을 테스트 해봐요"
        buttonLabel="확인"
      >
        모달안에서 이동하는 방법 고민해보기
      </Modal>
      <Modal
        modalOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        title=" 두 번째 모달도 테스트 해봐요"
        buttonLabel="확인"
      >
        링크 변경이 아니잖아
      </Modal>
    </div>
  );
}
