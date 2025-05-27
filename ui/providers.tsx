"use client"

import { HeroUIProvider } from "@heroui/system";
import { CameraViewProvider } from "./CameraView/cameraView.provider";
import { ModalProvider } from "./Modal/modal.provider";
import { LoadingProvider } from "./Loading/loading.provider";

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