import { Clone, Html, useGLTF, useTexture } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import Marker from "@/ui/example-room/components/Marker";

export default function NotePad({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
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
          setIsHovered(true);
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
          setIsHovered(false);
        }}
        position={[0, 0, 30]}
        object={scene}
      />
      {isHovered && (
        <Marker rotation={[0, -Math.PI / 2, 0]} position={[25, 7.3, 13.5]}>
          방명록을 작성하려면 노트를 클릭하세요
        </Marker>
      )}
    </>
  );
}
