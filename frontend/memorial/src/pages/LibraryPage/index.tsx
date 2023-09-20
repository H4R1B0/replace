import Library from "@components/3d/Library";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import styles from "./LibraryPage.module.css";
import Modal from "@components/ui/Modal";
import { useState } from "react";

export default function LibraryPage() {
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Canvas>
        <OrbitControls />
        <Stage environment="city" intensity={0.5} adjustCamera>
          {/* <ambientLight /> */}
          <Library
            onLetterClick={() => setLetterModalOpen(true)}
            onBookShelfClick={() => setBookModalOpen(true)}
          />
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
