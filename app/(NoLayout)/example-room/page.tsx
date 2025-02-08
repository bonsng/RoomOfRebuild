"use client";

import React from "react";
import { ModalProvider } from "@/ui/Modal/modal.provider";
import { HeroUIProvider } from "@heroui/system";
import { CameraViewProvider } from "@/ui/CameraView/cameraView.provider";
import ExampleRoom3D from "@/ui/ExampleRoom/ExampleRoom3D";
import ExampleRoomHTML from "@/ui/ExampleRoom/ExampleRoomHTML";
import { LoadingProvider } from "@/ui/Loading/loading.provider";

export default function Page() {
  return (
    <>
      <HeroUIProvider>
        <CameraViewProvider>
          <ModalProvider>
            <LoadingProvider>
              <div className="h-screen dark">
                <ExampleRoom3D />
                <ExampleRoomHTML />
              </div>
            </LoadingProvider>
          </ModalProvider>
        </CameraViewProvider>
      </HeroUIProvider>
    </>
  );
}
