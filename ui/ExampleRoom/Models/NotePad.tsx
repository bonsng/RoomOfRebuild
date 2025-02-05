import { Clone, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function NotePad({ onClick }: { onClick: () => void }) {
  const { scene }: any = useGLTF(`/models/notepad.glb`);
  const notePadTexture = useTexture(`/models/final2.jpg`);
  notePadTexture.flipY = false;
  notePadTexture.colorSpace = THREE.SRGBColorSpace;
  const notePadMaterial = new THREE.MeshBasicMaterial({
    map: notePadTexture,
  });
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = notePadMaterial;
      child.castShadow = true;
    }
  });
  return (
    <>
      <Clone
        onClick={onClick}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
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
