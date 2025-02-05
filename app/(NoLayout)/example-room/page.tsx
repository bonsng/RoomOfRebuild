"use client";
import Experience from "@/ui/ExampleRoom/Experience";
import RoomButtons from "@/ui/ExampleRoom/RoomButtons";
import useMousePosition from "@/util/custom-hook/use-mouse-position";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { angles } from "@/ui/ExampleRoom/angles";
import CameraControls from "@/ui/ExampleRoom/Camera";
import { ModalProvider } from "@/ui/Modal/modal.provider";
import { HeroUIProvider } from "@heroui/system";
import { PostIts } from "@/models/PostIt";

export default function Page() {
  const { ratio } = useMousePosition();
  const [leftVisible, setLeftVisible] = useState(false);

  const [rightVisible, setRightVisible] = useState(false);
  const [view, setView] = useState(2);

  const clickLeft = () => setView(view - 1 == -1 ? 2 : view - 1);
  const clickRight = () => setView((view + 1) % 3);

  useEffect(() => {
    if (ratio) {
      if (ratio < 0.2) {
        setLeftVisible(true);
      } else if (ratio > 0.8) {
        setRightVisible(true);
      } else {
        if (leftVisible || rightVisible) {
          setLeftVisible(false);
          setRightVisible(false);
        }
      }
    }
  }, [ratio]);
  return (
    <>
      <HeroUIProvider>
        <ModalProvider>
          <div className="h-screen dark">
            <Canvas
              camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [
                  angles[0].position.x,
                  angles[0].position.y,
                  angles[0].position.z,
                ],
              }}
            >
              <Experience />
              <CameraControls
                position={angles[view].position}
                target={angles[view].target}
              />
            </Canvas>
            {view === 0 ? null : (
              <RoomButtons
                onClick={clickLeft}
                isLeft={true}
                visible={leftVisible}
              />
            )}
            {view === 2 ? null : (
              <RoomButtons
                onClick={clickRight}
                isLeft={false}
                visible={rightVisible}
              />
            )}
          </div>
        </ModalProvider>
      </HeroUIProvider>
    </>
  );
}
