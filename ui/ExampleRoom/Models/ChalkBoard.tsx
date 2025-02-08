import { useCameraViewState } from "@/ui/CameraView/cameraView.provider";
import { Clone, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function ChalkBoard({
  handleClick,
}: {
  handleClick: () => void;
}) {
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
          } else {
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        position={[0, 0, 30]}
        object={scene}
      />
    </>
  );
}
