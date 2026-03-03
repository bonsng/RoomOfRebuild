import { useCameraViewState } from "../../camera-view/cameraView.provider";
import { Clone, useGLTF, useTexture } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";
import Marker from "../components/Marker";

export default function ChalkBoard({
  handleClick,
}: {
  handleClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { state } = useCameraViewState();
  const { scene }: any = useGLTF(`/models/chalkboard.glb`);
  const chalkboardTexture = useTexture(`/models/chalk.jpg`);

  const preparedScene = useMemo(() => {
    // eslint-disable-next-line react-hooks/immutability
    chalkboardTexture.flipY = false;
    // eslint-disable-next-line react-hooks/immutability
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
    return scene;
  }, [scene, chalkboardTexture]);

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
        object={preparedScene}
      />
      {isHovered && (
        <Marker rotation={[0, -Math.PI / 2, 0]} position={[27, 18, 10]}>
          전체 방명록을 보려면 보드를 클릭하세요
        </Marker>
      )}
    </>
  );
}
