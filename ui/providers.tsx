"use client"


import { CameraViewProvider } from "../ui/camera-view/cameraView.provider";
import { ModalProvider } from "../ui/modal/modal.provider";
import { LoadingProvider } from "../ui/loading/loading.provider";
import { HeroUIProvider } from "@heroui/system";

interface Props {
    children: React.ReactNode;
}

export default function Providers({children}:Props) {
    return (
        <>
            <HeroUIProvider>
                <CameraViewProvider>
                    <ModalProvider>
                        <LoadingProvider>
                            {children}
                        </LoadingProvider>
                    </ModalProvider>
                </CameraViewProvider>
            </HeroUIProvider>
        </>
    )
}