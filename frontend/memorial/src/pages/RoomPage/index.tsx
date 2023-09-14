import Room from "@components/3d/Room";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

export default function RoomPage() {
  return (
    <Canvas>
      <OrbitControls />
      <Stage environment="city" intensity={0.5} adjustCamera>
        {/* <ambientLight /> */}
        <Room onTrashcanClick={() => console.log("nini")} />
      </Stage>
    </Canvas>
  );
}
