import Room from "@components/3d/Room";
import { Canvas } from "@react-three/fiber";
import {
  Stage,
  PresentationControls,
  Sparkles,
  Cloud,
  Environment,
} from "@react-three/drei";
import styles from "./RoomPage.module.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Pagination from "@components/ui/Pagination";

export default function RoomPage() {
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem("nickname");
  const { sequence } = useParams();
  const roomSequence = parseInt(sequence ?? "");

  //TODO: 급! use-guester로 손가락으로 확대하기 넣기
  //TODO: 누구의 방 이거 어케 할지...고정할지 말지 정하기
  return (
    <div className={styles.wrapper}>
      <Pagination
        prev="집"
        prevPath={`/house/${nickname}`}
        next="서재"
        nextPath={`/library/${roomSequence}`}
      />
      <div className={styles.titleContainer}>
        <h1>"{nickname}의 방"</h1>
      </div>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 30, 50] }}
        style={{ touchAction: "none" }}
        shadows
        className={styles.canvas}
      >
        <ambientLight color={0xffc845} intensity={1} position={[0, 40, 10]} />

        {/* TODO: x축 y축 안맞는 것 맞추기 */}
        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
            zoom={2}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Room
              onTrashcanClick={() => navigate("delete")}
              onFrameClick={() => navigate("photos")}
              onTelephoneClick={() => navigate("audio")}
              onRadioClick={() => navigate("radio")}
            />
          </PresentationControls>
        </Stage>
        <Cloud scale={6} opacity={0.3} depth={-20} segments={20} />
        <Sparkles
          count={60}
          size={3}
          position={[0, 0.9, 0]}
          scale={[10, 10, 10]}
          speed={1}
        />
        <Environment preset="sunset" />
      </Canvas>
      <Outlet />
    </div>
  );
}
