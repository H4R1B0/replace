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
import { Outlet, useNavigate } from "react-router-dom";
import { Bloom } from "@react-three/postprocessing";

export default function RoomPage() {
  const navigate = useNavigate();

  //TODO: 급! use-guester로 손가락으로 확대하기 넣기
  return (
    <div className={styles.wrapper}>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 30, 50] }}
        style={{ touchAction: "none" }}
        shadows
      >
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={6}
        />
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
        <Cloud
          scale={6}
          opacity={0.3}
          depth={10} // Z-dir depth
          segments={10} // Number of particles
        />
        <Sparkles
          count={80}
          size={3}
          position={[0, 0.9, 0]}
          scale={[10, 10, 10]}
          speed={0.5}
        />
        <Environment preset="sunset" />
      </Canvas>
      <Outlet />
    </div>
  );
}
