"use client";

import Model from "./Models/Model";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import GuestBook from "./GuestBook";
import { useCameraViewState } from "../CameraView/cameraView.provider";

export default function Experience() {
  const groupRef = useRef<THREE.Group>(null);
  const { state, dispatch } = useCameraViewState();

  useFrame((s) => {
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
        <Model />
        <GuestBook />
      </group>
      <ambientLight intensity={2} />
    </>
  );
}
