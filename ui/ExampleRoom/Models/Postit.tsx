import { useSpring, animated } from "@react-spring/three";
import { Clone, useGLTF, useTexture } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

export default function Posit({ position }: { position: number[] }) {
  const { scene }: any = useGLTF(`/models/postit.glb`);
  const postitTexture = useTexture(`/models/postit-diffuse.jpg`);
  const postitTextureNormal = useTexture(`/models/postit-normal.jpg`);
  const postitTextureRoughness = useTexture(`/models/postit-roughness.jpg`);

  postitTexture.flipY = false;
  postitTexture.colorSpace = THREE.SRGBColorSpace;

  const [visible, setVisible] = useState(false);

  const postitMaterial = new THREE.MeshStandardMaterial({
    map: postitTexture,
    roughnessMap: postitTextureRoughness,
    normalMap: postitTextureNormal,
    transparent: true,
  });

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = postitMaterial;
      child.castShadow = true;
    }
  });

  return (
    <>
      <Clone position={[0, position[0], 30 + position[1]]} object={scene} />
    </>
  );
}
