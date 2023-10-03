/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 house.glb -t, -i, -T, s, -j 
Files: house.glb [2.11MB] > house-transformed.glb [237.58KB] (89%)
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import housePath from "./house.glb?url";

type GLTFResult = GLTF & {
  nodes: {
    House_1: THREE.Mesh;
    House_2: THREE.Mesh;
    House_3: THREE.Mesh;
    House_4: THREE.Mesh;
    House_5: THREE.Mesh;
    House_6: THREE.Mesh;
    House_7: THREE.Mesh;
    House_8: THREE.Mesh;
    House_9: THREE.Mesh;
    House_10: THREE.Mesh;
    House_11: THREE.Mesh;
    leftDoor_1: THREE.Mesh;
    leftDoor_2: THREE.Mesh;
    leftDoor_3: THREE.Mesh;
    mainDoor_1: THREE.Mesh;
    mainDoor_2: THREE.Mesh;
    mainDoor_3: THREE.Mesh;
    rightDoor_1: THREE.Mesh;
    rightDoor_2: THREE.Mesh;
    rightDoor_3: THREE.Mesh;
    rightWindow_1: THREE.Mesh;
    rightWindow_2: THREE.Mesh;
    rightWindow_3: THREE.Mesh;
    mainWindow_1: THREE.Mesh;
    mainWindow_2: THREE.Mesh;
    mainWindow_3: THREE.Mesh;
    leftWindow_1: THREE.Mesh;
    leftWindow_2: THREE.Mesh;
    leftWindow_3: THREE.Mesh;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
    PaletteMaterial002: THREE.MeshStandardMaterial;
  };
};
type HouseProps = {
  onWindowClick?: (sequence: number) => void;
  isWindowLit: (sequence: number) => boolean;
} & JSX.IntrinsicElements["group"];

export default function House({
  onWindowClick,
  isWindowLit,
  ...other
}: HouseProps) {
  const { nodes, materials } = useGLTF(housePath) as GLTFResult;
  const litWindowMaterial = new THREE.MeshPhysicalMaterial({
    emissive: 0xffffff,
    emissiveIntensity: 1,
    color: 0x000000,
  });
  return (
    <group {...other} dispose={null}>
      <group position={[1.872, 0.307, 6.328]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.House_1.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.House_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.House_3.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.House_4.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.House_5.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.House_6.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.House_7.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.House_8.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh geometry={nodes.House_9.geometry} material={litWindowMaterial} />
        <mesh
          geometry={nodes.House_10.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.House_11.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
      <group position={[1.872, 0.307, 6.328]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.leftDoor_1.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.leftDoor_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.leftDoor_3.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
      <group position={[1.872, 0.307, 6.328]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.mainDoor_1.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.mainDoor_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.mainDoor_3.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
      <group position={[1.872, 0.307, 6.328]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.rightDoor_1.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.rightDoor_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.rightDoor_3.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>

      <group
        position={[1.872, 0.307, 6.328]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={() => onWindowClick?.(3)}
      >
        <mesh
          geometry={nodes.rightWindow_1.geometry}
          material={
            isWindowLit(3) ? litWindowMaterial : materials.PaletteMaterial001
          }
        />
        <mesh
          geometry={nodes.rightWindow_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.rightWindow_3.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>

      <group
        position={[1.872, 0.307, 6.328]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={() => onWindowClick?.(1)}
      >
        <mesh
          geometry={nodes.mainWindow_1.geometry}
          material={
            isWindowLit(1) ? litWindowMaterial : materials.PaletteMaterial001
          }
        />
        <mesh
          geometry={nodes.mainWindow_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.mainWindow_3.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
      <group
        position={[1.872, 0.307, 6.328]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={() => onWindowClick?.(2)}
      >
        <mesh
          geometry={nodes.leftWindow_1.geometry}
          material={
            isWindowLit(2) ? litWindowMaterial : materials.PaletteMaterial001
          }
        />
        <mesh
          geometry={nodes.leftWindow_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          geometry={nodes.leftWindow_3.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
    </group>
  );
}
