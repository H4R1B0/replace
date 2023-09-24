import { fetchRoomList } from "@apis/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import House from "@components/3d/House";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import styles from "./HousePage.module.css";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

import { useToggle } from "react-use";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterRoomModal from "@components/ui/Modal/RegisterRoomModal";
import { registerRoomTarget } from "@apis/room";

export default function HousePage() {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedSequence, setSelectedSequence] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //1. 등록되었는지 안되었는지 확인하기
  //2. 만약 등록되었다 -> navigate room
  //3. 등록 안되었다 -> 모달 보여주기

  const {
    isLoading,
    isError,
    data: roomList,
  } = useQuery({
    queryKey: ["roomList"],
    queryFn: fetchRoomList,
  });
  const registerRoomMutation = useMutation({
    mutationFn: registerRoomTarget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomList"] });
      navigate(`/room/${selectedSequence}`);
    },
  });

  if (isLoading) return "loading";
  if (isError) return `Error`;

  const { rooms } = roomList;

  const handleRoomRegister = (targetName: string) => {
    registerRoomMutation.mutate({ sequence: selectedSequence, targetName });
  };

  const handleWindowClick = (sequence: number) => {
    const room = rooms.find((room) => room.sequence === sequence);
    if (!room) return;
    if (room.targetName) {
      // navigate to room
      navigate(`/room/${room.sequence}`);
      return;
    }
    // show modal
    toggleModal();
    setSelectedSequence(sequence);
  };

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
            zoom={1.5}
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

              <House onWindowClick={handleWindowClick} />
            </Selection>
          </PresentationControls>
        </Stage>
      </Canvas>
      <RegisterRoomModal
        modalOpen={isModalOpen}
        onClose={toggleModal}
        onRegister={handleRoomRegister}
      />
    </div>
  );
}
