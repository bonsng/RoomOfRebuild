import { useCameraViewState } from "@/ui/CameraView/cameraView.provider";
import { Clone, useGLTF, useTexture } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import Marker from "../Components/Marker";

export default function ChalkBoard({
  handleClick,
}: {
  handleClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { state } = useCameraViewState();
  const { scene }: any = useGLTF(`/models/chalkboard.glb`);
  const chalkboardTexture = useTexture(`/models/chalk.jpg`);
  chalkboardTexture.flipY = false;
  chalkboardTexture.colorSpace = THREE.SRGBColorSpace;
  const chalkboardMaterial = new THREE.MeshStandardMaterial({
    map: chalkboardTexture,
  });
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = chalkboardMaterial;
      child.receiveShadow = true;
    }
  });

  return (
    <>
      <Clone
        onClick={handleClick}
        onPointerEnter={() => {
          if (state.view === 4) {
            document.body.style.cursor = "default";
            setIsHovered(false);
          } else {
            document.body.style.cursor = "pointer";
            setIsHovered(true);
          }
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
          setIsHovered(false);
        }}
        position={[0, 0, 30]}
        object={scene}
      />
      {isHovered && (
        <Marker rotation={[0, -Math.PI / 2, 0]} position={[27, 18, 10]}>
          전체 방명록을 보려면 보드를 클릭하세요
        </Marker>
      )}
    </>
  );
}
