"use client";

import React from "react";
import { ModalProvider } from "@/ui/Modal/modal.provider";
import { HeroUIProvider } from "@heroui/system";
import { CameraViewProvider } from "@/ui/CameraView/cameraView.provider";
import ExampleRoom3D from "@/ui/ExampleRoom/ExampleRoom3D";
import ExampleRoomHTML from "@/ui/ExampleRoom/ExampleRoomHTML";
import { LoadingProvider } from "@/ui/Loading/loading.provider";
import ExampleRoom from "@/ui/ExampleRoom/ExampleRoom";

export default function Page() {
  return (
    <>
      <HeroUIProvider>
        <CameraViewProvider>
          <ModalProvider>
            <LoadingProvider>
              <div className="h-screen dark">
                <ExampleRoom />
              </div>
            </LoadingProvider>
          </ModalProvider>
        </CameraViewProvider>
      </HeroUIProvider>
    </>
  );
}
