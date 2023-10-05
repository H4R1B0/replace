/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 library.glb -t, -i, -T, s 
Files: library.glb [22.85MB] > library-transformed.glb [3.34MB] (85%)
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import libraryPath from "./library.glb?url";
import { useEffect, useState } from "react";
import {
  Selection,
  EffectComposer,
  Outline,
  Select,
} from "@react-three/postprocessing";

type GLTFResult = GLTF & {
  nodes: {
    Window001: THREE.Mesh;
    Letter: THREE.Mesh;
    bookShelf134: THREE.Mesh;
    bookShelf134_1: THREE.Mesh;
    bookShelf134_2: THREE.Mesh;
    bookShelf134_3: THREE.Mesh;
    Procedural_Tree_2106: THREE.Mesh;
    low_poly_interior037: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cylinder013: THREE.Mesh;
    Cylinder013_1: THREE.Mesh;
    Cylinder013_2: THREE.Mesh;
    Cylinder013_3: THREE.Mesh;
    Frame_sunset_January: THREE.Mesh;
    Plane006: THREE.Mesh;
  };
  materials: {
    // PaletteMaterial001: THREE.MeshStandardMaterial
    ["low_poly_interior.020"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.027"]: THREE.MeshStandardMaterial;
    PaletteMaterial001: THREE.MeshStandardMaterial;
    paper: THREE.MeshStandardMaterial;
    ["Tree Bark 08"]: THREE.MeshStandardMaterial;
    furniture: THREE.MeshStandardMaterial;
    ["book-cover"]: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
    PaletteMaterial003: THREE.MeshStandardMaterial;
    PaletteMaterial004: THREE.MeshStandardMaterial;
    PaletteMaterial002: THREE.MeshStandardMaterial;
    pintura: THREE.MeshStandardMaterial;
    ["C_Die-cast aluminum.001"]: THREE.MeshStandardMaterial;
  };
};

type LibraryProps = {
  onBookShelfClick?: () => void;
  onLetterClick?: () => void;
} & JSX.IntrinsicElements["group"];

export default function Library({
  onBookShelfClick,
  onLetterClick,
  ...other
}: LibraryProps) {
  const { nodes, materials } = useGLTF(libraryPath) as GLTFResult;
  const [lightIntensity, setLightIntensity] = useState(1);
  const [increasing, setIncreasing] = useState(true);
  useEffect(() => {
    const animateLight = () => {
      setLightIntensity((prevIntensity) => {
        let newIntensity;

        if (increasing) {
          newIntensity = prevIntensity + 0.05; // 변화량을 원하는 대로 조절할 수 있습니다.
        } else {
          newIntensity = prevIntensity - 0.05;
        }

        if (newIntensity >= 3) setIncreasing(false);
        if (newIntensity <= 1) setIncreasing(true);

        return newIntensity;
      });
    };

    const animationFrameId = requestAnimationFrame(animateLight); // 애니메이션 루프를 생성합니다.

    return () => cancelAnimationFrame(animationFrameId); // 컴포넌트가 unmount될 때 애니메이션을 취소합니다.
  }, [increasing, lightIntensity]);
  return (
    <Selection>
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          blur
          visibleEdgeColor={0xff2a55}
          hiddenEdgeColor={0xff2a55}
          edgeStrength={500}
        />
      </EffectComposer>
      <group {...other} dispose={null}>
        <primitive
          object={new THREE.DirectionalLight("#FFA500", 1)}
          position={[5, 5, 5]}
          castShadow
        />

        <mesh
          geometry={nodes.Window001.geometry}
          material={materials.PaletteMaterial001}
          position={[1.799, 2.105, 3.689]}
          rotation={[0, 1.571, 0]}
          scale={[0.411, 0.559, 0.411]}
          castShadow
          receiveShadow
        />

        <Select enabled={true}>
          <mesh
            geometry={nodes.Letter.geometry}
            material={materials["low_poly_interior.020"]}
            position={[2.378, 1.053, 0.938]}
            scale={2.167}
            onClick={onLetterClick}
            castShadow
            receiveShadow
          >
            <pointLight
              position={[0, 0, 0]}
              color={"#ffff44"}
              intensity={lightIntensity}
              distance={1}
            />
          </mesh>
        </Select>
        <Select enabled={true}>
          <group
            position={[0.667, 0.929, 0.723]}
            scale={1.079}
            onClick={onBookShelfClick}
          >
            <mesh
              geometry={nodes.bookShelf134.geometry}
              material={materials["Material.001"]}
              castShadow
              receiveShadow
            />
            <mesh
              geometry={nodes.bookShelf134_1.geometry}
              material={materials["Material.027"]}
              castShadow
              receiveShadow
            />
            <mesh
              geometry={nodes.bookShelf134_2.geometry}
              material={materials.PaletteMaterial001}
              castShadow
              receiveShadow
            />
            <mesh
              geometry={nodes.bookShelf134_3.geometry}
              material={materials.paper}
              castShadow
              receiveShadow
            />
          </group>
        </Select>
        <mesh
          geometry={nodes.Procedural_Tree_2106.geometry}
          material={materials["Tree Bark 08"]}
          position={[2.817, 0.38, 1.953]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.416}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.low_poly_interior037.geometry}
          material={materials.furniture}
          position={[2.26, 0.492, 0.828]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.859}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Cube008.geometry}
          material={materials["book-cover"]}
          position={[2.503, 2.2, 0.395]}
          scale={1.176}
          castShadow
          receiveShadow
        />
        <group position={[0.555, 1.426, 2.875]}>
          <mesh
            geometry={nodes.Cylinder013.geometry}
            material={materials["Material.004"]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Cylinder013_1.geometry}
            material={materials.PaletteMaterial003}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Cylinder013_2.geometry}
            material={materials.PaletteMaterial004}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Cylinder013_3.geometry}
            material={materials.PaletteMaterial002}
            castShadow
            receiveShadow
          />
        </group>
        <mesh
          geometry={nodes.Frame_sunset_January.geometry}
          material={materials.pintura}
          position={[0.255, 2.219, 2.317]}
          rotation={[0, -Math.PI / 2, 0]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Plane006.geometry}
          material={materials["C_Die-cast aluminum.001"]}
          position={[0.523, 0.328, 2.606]}
          scale={[0.985, 1.839, 2.656]}
          castShadow
          receiveShadow
        />
      </group>
    </Selection>
  );
}

useGLTF.preload(libraryPath);
