import { fetchRoomList } from "@apis/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import House from "@components/3d/House";
import { Canvas } from "@react-three/fiber";
import {
  Stage,
  PresentationControls,
  Sparkles,
  Cloud,
} from "@react-three/drei";
import styles from "./HousePage.module.css";
import { Bloom } from "@react-three/postprocessing";

import { useToggle } from "react-use";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterRoomModal from "@components/ui/Modal/RegisterRoomModal";
import { registerRoomTarget } from "@apis/room";
import { useParams } from "react-router-dom";
import { Environment } from "@react-three/drei";
import toast from "react-hot-toast";

import Spinner from "@components/ui/Spinner";

export default function HousePage() {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedSequence, setSelectedSequence] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { nickname } = useParams();

  if (typeof nickname === "undefined") return;

  const {
    isLoading,
    isError,
    data: roomList,
  } = useQuery({
    queryKey: ["roomList", nickname],
    queryFn: () => fetchRoomList(nickname),
  });

  const registerRoomMutation = useMutation({
    mutationFn: registerRoomTarget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomList", nickname] });
      toast.success("방이 성공적으로 생성되었습니다");
      navigate(`/room/${nickname}/${selectedSequence}`);
    },
    onError: (error: Error) => {
      if (error.message === "400") {
        toast.error("방 생성에 실패하였습니다");
      }
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return `Error`;

  const { rooms } = roomList;

  const isWindowLit = (sequence: number) => {
    const room = rooms.find((room) => room.sequence === sequence);
    if (!room) return false;
    return room.targetName !== null;
  };

  const handleRoomRegister = (targetName: string) => {
    registerRoomMutation.mutate({ sequence: selectedSequence, targetName });
  };

  const handleWindowClick = (sequence: number) => {
    const room = rooms.find((room) => room.sequence === sequence);
    if (!room) return;
    if (room.targetName) {
      // navigate to room
      navigate(`/room/${nickname}/${room.sequence}`);
      return;
    }
    // show modal
    toggleModal();
    setSelectedSequence(sequence);
  };

  return (
    <div className={styles.wrapper}>
      <Canvas
        className={styles.canvas}
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 8], zoom: 1.2 }}
        style={{ touchAction: "none" }}
        linear
        shadows
      >
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={6}
        />
        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
            global
            zoom={1.5}
            rotation={[0, -Math.PI / 2, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <House
              onWindowClick={handleWindowClick}
              isWindowLit={isWindowLit}
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
          count={40}
          size={10}
          position={[0.9, 0.9, 0.9]}
          scale={[20, 20, 20]}
          speed={1}
        />
        <ambientLight intensity={0.5} />
        <Environment preset="sunset" />
      </Canvas>
      <div className={styles.neonTextContainer}>
        <div
          className={styles.neonText}
          onClick={() => navigate(`/tribute/main`)}
        >
          &lt; Previous
        </div>
        <div
          className={styles.neonText}
          onClick={() => navigate(`/payphone/${nickname}`)}
        >
          Next &gt;
        </div>
      </div>
      <RegisterRoomModal
        modalOpen={isModalOpen}
        onClose={toggleModal}
        onRegister={handleRoomRegister}
      />
    </div>
  );
}
