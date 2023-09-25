import Room from "@components/3d/Room";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import styles from "./RoomPage.module.css";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

import { Outlet, useNavigate } from "react-router-dom";

export default function RoomPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 8] }}
        style={{ touchAction: "none" }}
      >
        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
            snap
            global
            zoom={1.5}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            {/* <pointLight position={[90, 10, 10]} /> */}
            <Selection>
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  blur
                  visibleEdgeColor={0xffffff}
                  edgeStrength={100}
                  width={1000}
                />
              </EffectComposer>
              {/*TODO: onTrashcanClick에 전달하는 함수 상단에 정의하기 */}
              {/* TODO: callback 함수 대신에 route transition 쓰기 */}
              <Room
                onTrashcanClick={() => navigate("delete")}
                onFrameClick={() => navigate("photos")}
                onTelephoneClick={() => navigate("audio")}
              />
            </Selection>
          </PresentationControls>
        </Stage>
      </Canvas>
      <Outlet />
    </div>
  );
}
