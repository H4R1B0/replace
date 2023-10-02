/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 room.glb -t -i -T --shadows -j 
Files: room.glb [6.57MB] > room-transformed.glb [1.71MB] (74%)
*/
import * as THREE from "three";
import { useGLTF, Bounds, useBounds } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import roomPath from "./room.glb?url";

type GLTFResult = GLTF & {
  nodes: {
    floor_1: THREE.Mesh;
    floor_2: THREE.Mesh;
    floor_3: THREE.Mesh;
    floor_4: THREE.Mesh;
    floor_5: THREE.Mesh;
    floor_6: THREE.Mesh;
    floor_7: THREE.Mesh;
    floor_8: THREE.Mesh;
    floor_9: THREE.Mesh;
    floor_10: THREE.Mesh;
    floor_11: THREE.Mesh;
    tableLamp_1: THREE.Mesh;
    tableLamp_2: THREE.Mesh;
    phone_1: THREE.Mesh;
    phone_2: THREE.Mesh;
    picture: THREE.Mesh;
    picture_1: THREE.Mesh;
    picture_2: THREE.Mesh;
    picture_3: THREE.Mesh;
    picture_4: THREE.Mesh;
    picture_5: THREE.Mesh;
    picture_6: THREE.Mesh;
    picture_7: THREE.Mesh;
    picture_8: THREE.Mesh;
    picture_9: THREE.Mesh;
    picture_10: THREE.Mesh;
    picture_11: THREE.Mesh;
    wallLight_1: THREE.Mesh;
    wallLight_2: THREE.Mesh;
    radio_1: THREE.Mesh;
    radio_2: THREE.Mesh;
    radio_3: THREE.Mesh;
    radio_4: THREE.Mesh;
    radio_5: THREE.Mesh;
    radio_6: THREE.Mesh;
    radio_7: THREE.Mesh;
    radio_8: THREE.Mesh;
    trashcan_1: THREE.Mesh;
    trashcan_2: THREE.Mesh;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
    PaletteMaterial002: THREE.MeshStandardMaterial;
    ["Blanket pattern"]: THREE.MeshStandardMaterial;
    Floor: THREE.MeshStandardMaterial;
    Emission: THREE.MeshStandardMaterial;
    PaletteMaterial003: THREE.MeshStandardMaterial;
    ["Picture 2"]: THREE.MeshStandardMaterial;
    ["Material.021"]: THREE.MeshBasicMaterial;
    PaletteMaterial004: THREE.MeshStandardMaterial;
  };
};

type RoomProps = {
  onTrashcanClick?: () => void;
  onFrameClick?: () => void;
  onTelephoneClick?: () => void;
  onRadioClick?: () => void;
  children?: React.ReactNode;
} & JSX.IntrinsicElements["group"];

export default function Room({
  onTelephoneClick,
  onTrashcanClick,
  onFrameClick,
  onRadioClick,
  children,
  ...other
}: RoomProps) {
  const { nodes, materials } = useGLTF(roomPath) as GLTFResult;

  return (
    <group {...other} dispose={null}>
      <group position={[1.641, 1.342, 2.624]} scale={0.411}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_1.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_3.geometry}
          material={materials.PaletteMaterial002}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_4.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_5.geometry}
          material={materials["Blanket pattern"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_6.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_7.geometry}
          material={materials.Floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_8.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_9.geometry}
          material={materials.Emission}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_10.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floor_11.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
      <group position={[0.361, 2.065, 3.159]} scale={0.411}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tableLamp_1.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tableLamp_2.geometry}
          material={materials.PaletteMaterial002}
        />
      </group>
      <group
        position={[1.986, 3.938, 0.954]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.193}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.wallLight_1.geometry}
          material={materials["Material.021"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.wallLight_2.geometry}
          material={materials.PaletteMaterial004}
        />
      </group>
      <Bounds fit clip observe margin={1.2}>
        <SelectToZoom>
          <group
            position={[2.875, 2.024, 1.107]}
            rotation={[Math.PI, -1.309, Math.PI]}
            scale={0.14}
            onClick={onTelephoneClick}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.phone_1.geometry}
              material={materials.PaletteMaterial003}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.phone_2.geometry}
              material={materials.PaletteMaterial001}
            />
          </group>

          <group
            position={[1.512, 2.895, 0.995]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[0.448, 0.537, 0.432]}
            onClick={onFrameClick}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture.geometry}
              material={materials.PaletteMaterial002}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_1.geometry}
              material={materials["Picture 2"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_2.geometry}
              material={materials.PaletteMaterial003}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_3.geometry}
              material={materials.PaletteMaterial002}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_4.geometry}
              material={materials["Picture 2"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_5.geometry}
              material={materials.PaletteMaterial003}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_6.geometry}
              material={materials.PaletteMaterial002}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_7.geometry}
              material={materials["Picture 2"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_8.geometry}
              material={materials.PaletteMaterial003}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_9.geometry}
              material={materials.PaletteMaterial002}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_10.geometry}
              material={materials["Picture 2"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.picture_11.geometry}
              material={materials.PaletteMaterial003}
            />
          </group>

          <group
            position={[0.42, 2.217, 2.639]}
            rotation={[Math.PI, -1.332, Math.PI]}
            scale={[0.269, 0.129, 0.087]}
            onClick={onRadioClick}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.radio_1.geometry}
              material={materials.PaletteMaterial003}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.radio_2.geometry}
              material={materials.PaletteMaterial001}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.radio_3.geometry}
              material={materials.PaletteMaterial001}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.radio_4.geometry}
              material={materials.PaletteMaterial001}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.radio_5.geometry}
              material={materials.PaletteMaterial001}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.radio_6.geometry}
              material={materials.PaletteMaterial001}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.radio_7.geometry}
              material={materials.PaletteMaterial001}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.radio_8.geometry}
              material={materials.PaletteMaterial001}
            />
          </group>

          <group
            position={[0.471, 1.752, 3.777]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.47}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trashcan_1.geometry}
              material={materials.PaletteMaterial003}
              onClick={onTrashcanClick}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trashcan_2.geometry}
              material={materials.PaletteMaterial001}
            />
          </group>
        </SelectToZoom>
      </Bounds>
    </group>
  );
}
function SelectToZoom({ children }: { children: React.ReactNode }) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
}
