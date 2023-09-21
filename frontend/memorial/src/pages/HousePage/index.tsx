import House from "@components/3d/House";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import styles from "./HousePage.module.css";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

export default function HousePage() {
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
            global
            zoom={2}
            rotation={[0, -Math.PI / 2, 0]}
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
              <House onHouseClick={() => console.log("ninni")} />
            </Selection>
          </PresentationControls>
        </Stage>
      </Canvas>
    </div>
  );
}
