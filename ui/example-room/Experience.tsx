"use client";

import Model from "./models/Model";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import GuestBook from "./GuestBook";
import { useCameraViewState } from "@/ui/camera-view/cameraView.provider";
import PhotoAlbum from "./PhotoAlbum";
import { Environment, Stars } from "@react-three/drei";
// import { useControls } from "leva";

export default function Experience() {
  const groupRef = useRef<THREE.Group>(null);
  const { state } = useCameraViewState();
  const [isHovered] = useState(false);
  useFrame(({ pointer }) => {
    if (isHovered) return;
    if (!state.fix) {
      if (groupRef.current) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          (pointer.x * Math.PI) / 30,
          0.1,
        );
      }
    }
  });

  return (
    <>
      <Environment
        preset="night"
        background
        backgroundBlurriness={0.8}
        backgroundIntensity={0.3}
      />
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <group ref={groupRef}>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <GuestBook />
        <PhotoAlbum />
      </group>

      <ambientLight intensity={1} />
      <Light />
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
      <spotLight
        ref={mainLightRef}
        castShadow
        color="white"
        intensity={20}
        position={[17, 12, 15]}
        distance={-3}
        angle={Math.PI / 4}
        penumbra={0.5}
        decay={0.5}
      />
      <mesh ref={boxRef} position={[32, 13, 10]} scale={[1, 1, 1]}>
        <boxGeometry />
        <meshBasicMaterial color="white" visible={false} opacity={0} />
      </mesh>
    </>
  );
};
