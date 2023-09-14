import Payphone from "@components/3d/Payphone";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

export default function PayphonePage() {
  return (
    <Canvas>
      <OrbitControls />
      <Stage environment="city" intensity={0.5} adjustCamera>
        <Payphone onPayphoneClick={() => console.log("여기가 공중전화?")} />
      </Stage>
    </Canvas>
  );
}
