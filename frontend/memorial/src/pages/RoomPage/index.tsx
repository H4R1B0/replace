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

  return (
    <div className={styles.wrapper}>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 8] }}
        style={{ touchAction: "none" }}
        shadows
      >
        <ambientLight color={0xffc845} intensity={1} position={[0, 40, 10]} />

        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={6}
        />

        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
            zoom={1.5}
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
          depth={-12} // Z-dir depth
          segments={20} // Number of particles
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
