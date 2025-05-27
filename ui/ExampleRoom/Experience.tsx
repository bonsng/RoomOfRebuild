"use client";

import Model from "./Models/Model";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import GuestBook from "./GuestBook";
import { useCameraViewState } from "../CameraView/cameraView.provider";
import PhotoAlbum from "./PhotoAlbum";
// import { Environment, Html, useHelper } from "@react-three/drei";
// import { useControls } from "leva";

export default function Experience() {
  const groupRef = useRef<THREE.Group>(null);
  const { state, dispatch } = useCameraViewState();
  const [isHovered, setIsHovered] = useState(false);
  useFrame((s) => {
    if (isHovered) return;
    if (!state.fix) {
      if (groupRef.current) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          (s.mouse.x * Math.PI) / 30,
          0.1
        );
      }
    }
  });

  return (
    <>
      <color args={["#000"]} attach="background" />
      <group ref={groupRef}>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <GuestBook />
        <PhotoAlbum />
      </group>

      <ambientLight intensity={1} />
      <Light />

      {/* <Environment preset="night" background backgroundIntensity={10} /> */}
    </>
  );
}

/**
 * Light
 */
const Light = () => {

  const mainLightRef = useRef<THREE.SpotLight>(null!);
  const boxRef = useRef<THREE.Object3D>(null!);
  // useHelper(mainLightRef, THREE.SpotLightHelper, "red");

  useEffect(() => {
    if (mainLightRef.current) {
      mainLightRef.current.target = boxRef.current;
    }
  }, []);

  return (
    <>
      <spotLight ref={mainLightRef} castShadow  color="white" intensity={20} position={[17, 12, 15]} distance={-3} angle={Math.PI / 4} penumbra={0.5} decay={0.5} />
      <mesh ref={boxRef} position={[32, 13, 10]} scale={[1, 1, 1]}>
        <boxGeometry />
        <meshBasicMaterial color="white" visible={false} opacity={0} />
      </mesh>
    </>
  );
};

// Light 조정부터 시작 (02.11)

/**
 * Guides
 */
