import Payphone from "@components/3d/Payphone";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  Edges,
  PresentationControls,
} from "@react-three/drei";
import styles from "./PayphonePage.module.css";

export default function PayphonePage() {
  return (
    <div className={styles.wrapper}>
      <Canvas flat camera={{ fov: 25, position: [0, 0, 8] }}>
        <OrbitControls />
        <Stage environment="city" intensity={0.5} adjustCamera>
          <PresentationControls
            snap
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 2.5, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Payphone onPayphoneClick={() => console.log("여기가 공중전화?")} />
          </PresentationControls>
        </Stage>
      </Canvas>
    </div>
  );
}
