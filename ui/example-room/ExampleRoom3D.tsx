"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { useCameraViewState } from "../../ui/camera-view/cameraView.provider";
import { angles } from "../../util/data/angles";
import { useEffect } from "react";
import CameraControls from "./Camera";

export default function ExampleRoom3D() {
  const { state, dispatch } = useCameraViewState();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_VIEW", payload: 1 });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 11, 150],
      }}
    >
      <Experience />
      <CameraControls
        position={angles[state.view].position}
        target={angles[state.view].target}
      />
    </Canvas>
  );
}

// [20, 15, 50]
