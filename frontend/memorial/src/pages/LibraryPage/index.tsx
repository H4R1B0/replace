import Library from "@components/3d/Library";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import styles from "./LibraryPage.module.css";

export default function LibraryPage() {
  return (
    <div className={styles.wrapper}>
      <Canvas>
        <OrbitControls />
        <Stage environment="city" intensity={0.5} adjustCamera>
          {/* <ambientLight /> */}
          <Library
            onLetterClick={() => console.log("편지")}
            onBookShelfClick={() => console.log("책장")}
          />
        </Stage>
      </Canvas>
    </div>
  );
}
