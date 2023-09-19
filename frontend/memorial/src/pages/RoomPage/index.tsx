import Room from "@components/3d/Room";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  Edges,
  PresentationControls,
} from "@react-three/drei";
import styles from "./RoomPage.module.css";

export default function RoomPage() {
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
            {/* <ambientLight /> */}
            <Room onTrashcanClick={() => console.log("nini")} />
          </PresentationControls>
        </Stage>
      </Canvas>
    </div>
  );
}
